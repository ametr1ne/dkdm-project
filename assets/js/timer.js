/*------ timer -----------*/

document.addEventListener("DOMContentLoaded", function () {
  let diff = $("#timer").data("diff");

  let timerId = null;

  function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    if (diff <= 0) {
      clearInterval(timerId);
    }

    const days = diff > 0 ? Math.floor(diff / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 60) % 60 : 0;
    const seconds = diff > 0 ? diff % 60 : 0;

    for (let i = 0; i < $days.length; i++) {
      if (days === 0) {
        $days[i].textContent = "0";
      } else {
        $days[i].textContent = days < 10 ? days : days;
      }
      $txt[i].textContent = declensionNum(days, ["день", "дня", "дней"]);
      $hours[i].textContent = hours < 10 ? "0" + hours : hours;
      $minutes[i].textContent = minutes < 10 ? "0" + minutes : minutes;
      $seconds[i].textContent = seconds < 10 ? "0" + seconds : seconds;
      $days[i].dataset.title = declensionNum(days, ["день", "дня", "дней"]);
    }

    diff -= 1;
  }

  const $days = document.querySelectorAll(".timer__days");
  const $hours = document.querySelectorAll(".timer__hours");
  const $minutes = document.querySelectorAll(".timer__minutes");
  const $seconds = document.querySelectorAll(".timer__seconds");
  const $txt = document.querySelectorAll(".timer__text");

  countdownTimer();

  timerId = setInterval(countdownTimer, 1000);
});
