const $ = require('jquery')
const confirmationForm = require('./confirmation-form.js')
const stripeResponseHandler = require('../scripts/stripe-payment.js')


var renderPaymentForm = function() {

  $('<div id="payment-form">').appendTo('#root')

  $('<h1>').text('Your Details').appendTo('#payment-form')

  $('<input placeholder="Full Name" name="name">').appendTo('#payment-form')
  $('<input placeholder="Email" name="email">').appendTo('#payment-form')
  $('<input placeholder="Confirm Email">').appendTo('#payment-form')

  $('<h1>').text('Payment Details').appendTo('#payment-form')

  $('<form id="payment-stripe-form">').attr('method', 'post').attr('action', 'http://localhost:3030/pay').appendTo('#payment-form')

  $('<input placeholder="Name on Card">').appendTo('#payment-stripe-form')
  $('<input placeholder="Card Number">').attr('data-stripe', 'number').appendTo('#payment-stripe-form')
  $('<input placeholder="Expiry Month">').attr('data-stripe', 'exp_month').appendTo('#payment-stripe-form')
  $('<input placeholder="Expiry Year">').attr('data-stripe', 'exp_year').appendTo('#payment-stripe-form')
  $('<input placeholder="CSV">').attr('data-stripe', 'cvc').appendTo('#payment-stripe-form')
  $('<input type="submit" class="submit" value="Submit Payment">').attr('id', 'submit-btn').appendTo('#payment-stripe-form')
  $('<form action="/" class="home-link">').appendTo('#payment-stripe-form')
  $('<button>').text('Cancel').attr('id', 'cancel-btn').appendTo('.home-link')

  $('<h2>').text('Total: $500').appendTo('#payment-form')

  $('<span class="payment-errors">').appendTo('#payment-form')

  $('#submit-btn').click(function() {

    console.log('clicked submit button');

    var $form = $('#payment-stripe-form');

    $form.submit(function(event) {
      // Disable the submit button to prevent repeated clicks:
      $form.find('.submit').prop('disabled', true);

      // Request a token from Stripe:
      Stripe.card.createToken($form, stripeResponseHandler);

      // Prevent the form from being submitted:
      return false;

    });

  });

}

module.exports = renderPaymentForm
