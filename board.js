var config = {
  goTime: '7:15:00',
  alertThreshold: 5 * 60
};

(function ($) {

  var clockEl;
  var countdownEl;

  $(document).ready(function () {
    clockEl = $('#clock');
    countdownEl = $('#countdown');

    var containers = $('.dropzone').get();
    var droppable = new Draggable.Droppable(containers, {
      draggable: '.item',
      dropzone: '.dropzone'
    });


    setTimes();
    setInterval(function () {
      setTimes();
    }, 1000);

    function setTimes() {
      var d = new Date();
      clockEl.html(d.toLocaleTimeString());
      var end = new Date(d.toDateString() + ' ' + config.goTime);
      var interval = Math.ceil((end - d) / 1000);
      if (interval < -3600) {
        interval += 24 * 60 * 60;
      }
      else if (interval < 0) {
        interval = 0;
      }

      countdownEl.html(interval.toHHMMSS()).toggleClass('alert', interval < config.alertThreshold);
    }
  });

})(jQuery);

Number.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
};
