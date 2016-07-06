(function () {
  'use strict';

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  }

  var $toastr = $('#toastr');
  switch ($toastr.data('type')) {
  case 'success':
    toastr.success($toastr.text());
    break;
  case 'error':
    toastr.error($toastr.text());
    break;
  case 'info':
    toastr.error($toastr.text());
    break;
  case 'warning':
    toastr.error($toastr.text());
    break;
  }
}());
