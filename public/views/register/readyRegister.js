/* jshint unused: false */
/*
 *  Document   : readyRegister.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Register page
 */

'use strict';

var ReadyRegister = function(){

  return{
    init: function(){
      /*
       *  Jquery Validation, Check out more examples and documentation at https://github.com/jzaefferer/jquery-validation
       */

      /* Register form - Initialize Validation */
      $('#form-register').validate({
        errorClass: 'help-block animation-slideUp', // You can change the animation class for a different entrance animation - check animations page
      errorElement: 'div',
      errorPlacement: function(error, e){
        e.parents('.form-group > div').append(error);
      },
      highlight: function(e){
        $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
        $(e).closest('.help-block').remove();
      },
      success: function(e){
        if (e.closest('.form-group').find('.help-block').length === 2){
          e.closest('.help-block').remove();
        } else{
          e.closest('.form-group').removeClass('has-success has-error');
          e.closest('.help-block').remove();
        }
      },
      rules:{
        'alias':{
          required: true
        },
        'email':{
          required: true,
          email: true
        },
        'password':{
          required: true,
          minlength: 6
        },
        'confirm':{
          required: true,
          equalTo: '#register-password'
        },
        'register-terms':{
          required: true
        }
      },
      messages:{
        'alias':{
          required: 'Please enter a username',
          minlength: 'Please enter a username'
        },
        'email': 'Please enter a valid email address',
        'password':{
          required: 'Please provide a password',
          minlength: 'Your password must be at least 6 characters long'
        },
        'confirm':{
          required: 'Please provide a password',
          minlength: 'Your password must be at least 6 characters long',
          equalTo: 'Please enter the same password as above'
        },
        'register-terms':{
          required: 'Please accept the terms!'
        }
      }
      });
    }
  };
}();

