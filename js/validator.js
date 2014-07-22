$(document).ready(function () {
    var $,
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    $ = jQuery;

    $.fn.validateCreditCard = function(callback, options) {
        var card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref, _ref1;
        card_types = [
            {
                name: 'amex',
                pattern: /^3[47]/,
                valid_length: [15]
            }, {
                name: 'diners',
                pattern: /^30[0-5]/,
                valid_length: [14]
            }, {
                name: 'diners',
                pattern: /^36/,
                valid_length: [14]
            }, {
                name: 'jcb',
                pattern: /^35(2[89]|[3-8][0-9])/,
                valid_length: [16]
            }, {
                name: 'laser',
                pattern: /^(6304|670[69]|6771)/,
                valid_length: [16, 17, 18, 19]
            }, {
                name: 'visa electron',
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                valid_length: [16]
            }, {
                name: 'visa',
                pattern: /^4/,
                valid_length: [16,13]
            }, {
                name: 'mastercard',
                pattern: /^5[1-5]/,
                valid_length: [16]
            }, {
                name: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
            }, {
                name: 'discover',
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                valid_length: [16]
            }
        ];
        if (options == null) {
            options = {};
        }
        if ((_ref = options.accept) == null) {
            options.accept = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                    card = card_types[_i];
                    _results.push(card.name);
                }
                return _results;
            })();
        }
        _ref1 = options.accept;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            card_type = _ref1[_i];
            if (__indexOf.call((function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                    card = card_types[_j];
                    _results.push(card.name);
                }
                return _results;
            })(), card_type) < 0) {
                throw "Credit card type '" + card_type + "' is not supported";
            }
        }
        get_card_type = function(number) {
            var _j, _len1, _ref2;
            _ref2 = (function() {
                var _k, _len1, _ref2, _results;
                _results = [];
                for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                    card = card_types[_k];
                    if (_ref2 = card.name, __indexOf.call(options.accept, _ref2) >= 0) {
                        _results.push(card);
                    }
                }
                return _results;
            })();
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                card_type = _ref2[_j];
                if (number.match(card_type.pattern)) {
                    return card_type;
                }
            }
            return null;
        };
        is_valid_luhn = function(number) {
            var digit, n, sum, _j, _len1, _ref2;
            sum = 0;
            _ref2 = number.split('').reverse();
            for (n = _j = 0, _len1 = _ref2.length; _j < _len1; n = ++_j) {
                digit = _ref2[n];
                digit = +digit;
                if (n % 2) {
                    digit *= 2;
                    if (digit < 10) {
                        sum += digit;
                    } else {
                        sum += digit - 9;
                    }
                } else {
                    sum += digit;
                }
            }
            return sum % 10 === 0;
        };
        is_valid_length = function(number, card_type) {
            var _ref2;
            return _ref2 = number.length, __indexOf.call(card_type.valid_length, _ref2) >= 0;
        };
        validate_number = function(number) {
            var length_valid, luhn_valid;
            card_type = get_card_type(number);
            luhn_valid = false;
            length_valid = false;
            if (card_type != null) {
                luhn_valid = is_valid_luhn(number);
                length_valid = is_valid_length(number, card_type);
            }
            return callback({
                card_type: card_type,
                luhn_valid: luhn_valid,
                length_valid: length_valid
            });
        };
        validate = function() {
            var number;
            number = normalize($(this).val());
            return validate_number(number);
        };
        normalize = function(number) {
            return number.replace(/[ -]/g, '');
        };
        this.bind('input', function() {
            $(this).unbind('keyup');
            return validate.call(this);
        });
        this.bind('keyup', function() {
            return validate.call(this);
        });
        if (this.length !== 0) {
            validate.call(this);
        }
        return this;
    };

});


var ccvalid = false;
var cardholdervalid = false;
var cardcvvvalid = false;
var cardexpiryvaid = false;
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.removeEnd = function(s){
    if(this.endsWith(s)){
        return this.substring(0,this.length- s.length);
    }
    return this;
};
function validateInlineForm() {
    var checks = true;
    var errString = 'Alla fält behöver vara ifyllda. Det som saknas är:\n';

    if (!ccvalid) {
        errString += "Kortnummer, ";
        checks = false;
    }
    if (!cardholdervalid) {
        errString += "Korthavarens namn, ";
        checks = false;
    }
    if (!cardcvvvalid) {
        errString += "CVV-kod, ";
        checks = false;
    }
    if (!cardexpiryvaid) {
        errString += "Giltighetstid";
        checks = false;
    }
    if (!checks) {
        //            $('#paybtn').show();
        //           $('#loading').addClass('hidden');
        alert(errString.removeEnd(', '));
        $('body').removeClass("loading");
        return false;
    }
    return true;
}

$(document).ready(function () {

    $('#mondidopayform').submit(function(){

    });
    $('#paybtn').click(function(){
        $('#paybtn').hide();
        $('#loading').removeClass('hidden');
    });

    $('input[data-encrypted-attribute="card_number"]').validateCreditCard(function (result)
    {
        if(result.length_valid){
            ccvalid = true;
            $('input[data-encrypted-attribute="card_number"]').addClass('valid');
            $('input[data-encrypted-attribute="card_type"]').val(result.card_type.name.toUpperCase());
            $('input[data-encrypted-attribute="card_type"]').addClass('valid');
            $('.card_icon').removeClass('selected');
            $('.card_' + result.card_type.name).addClass('selected');
        }else{
            $('.card_icon').removeClass('selected');
            ccvalid = false;
            $('input[data-encrypted-attribute="card_number"]').removeClass('valid');
            $('input[data-encrypted-attribute="card_type"]').removeClass('valid');
        }
    });

    $('input[name="card_holder"]').keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        var val = $('input[name="card_holder"]').val();
        var isValid = val.split(' ').length;
        if(isValid > 1){
            $('input[name="card_holder"]').addClass('valid');
            cardholdervalid = true;
        }else{
            $('input[name="card_holder"]').removeClass('valid');
            cardholdervalid = false;
        }
    });

    $('input[data-encrypted-attribute="card_cvv"]').keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        var val = $('input[data-encrypted-attribute="card_cvv"]').val();
        if(val.length >1 ){
            $('input[data-encrypted-attribute="card_cvv"]').addClass('valid');
            cardcvvvalid = true;
        }else{
            $('input[data-encrypted-attribute="card_cvv"]').removeClass('valid');
            cardcvvvalid = false;
        }
    });

    $('input[name="expMM"], input[name="expYY"]').change(function (event) {
        var val = $('input[name="expMM"]').val();
        var val2 = $('input[name="expYY"]').val();

        if(val!='' && val2!=''){
            $('input[data-encrypted-attribute="card_expiry"]').val(val + val2);
            $('input[name="expMM"]').addClass('valid');
            $('input[name="expYY"]').addClass('valid');
            cardexpiryvaid = true;
        }else{
            $('input[name="expMM"]').removeClass('valid');
            $('input[name="expYY"]').removeClass('valid');
            cardexpiryvaid = false;
        }
    });

});

