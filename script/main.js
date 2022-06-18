/**
 *  Not very safe and performance solution, but simple and free))
 */
// TODO change to real
const API_KEY = "bot5318573653:AAHwuCAZPyA8W-1234qwer1234qwer";
const CHAT_ID = -123456789;

$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

let block = false;

$(function () {

    setTimeout(() => {
        $('a.page-scroll').bind('click', function (event) {
            const $anchor = $(this);
            if (!block) {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            }
        });
    }, 1000);


    $('#signUpFormData').validate({
        rules: {
            gmail: {
                required: true,
                email: true
            }
        },
        message: {
            gmail: "Please enter a gmail."
        }
    });

});

function openSignInForm() {
    document.getElementById("signInForm").style.display = "block";
    document.getElementById("background").style.display = "block";
}

function closeSignInForm() {
    document.getElementById("signInForm").style.display = "none";
    document.getElementById("background").style.display = "none";
}

function openSignUpForm() {
    block = true;
    $("html, body").animate({scrollTop: 0}, 2000);
    document.getElementById("signUpForm").style.display = "block";
    document.getElementById("background").style.display = "block";
    setTimeout(() => block = false, 2500)
}

function closeSignUpForm() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("background").style.display = "none";
}

function openSuccessInvite() {
    document.getElementById("successInvite").style.display = "block";
    document.getElementById("background").style.display = "block";
}

function closeSuccessInvite() {
    document.getElementById("successInvite").style.display = "none";
    document.getElementById("background").style.display = "none";
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function sendSignUpFormMsg() {

    if ($("#signUpFormData").valid()) {

        const form = document.forms['signUpFormData'];

        const gmail = form.elements['gmail'].value
        const skype = form.elements['skype'].value
        const experience = form.elements['experience'].value
        const traffic = form.elements['traffic'].value
        const country = form.elements['country'].value
        const additional = form.elements['additional'].value

        const main = `New user ask invite! %0A%0A`;
        const mailStr = gmail.length > 0 ? `Gmail%0A${gmail}%0A%0A` : '';
        const skypeStr = skype.length > 0 ? `Skype%0A${skype}%0A%0A` : '';
        const expStr = experience.length > 0 ? `How many years of experience do you have in the industry?%0A ${experience}%0A%0A` : '';
        const typesStr = traffic.length > 0 ? `What types of traffic do you work with?%0A ${traffic}%0A%0A` : '';
        const countryStr = country.length > 0 ? `What is your country?%0A ${country}%0A%0A` : '';
        const additionalStr = additional.length > 0 ? `Please, include any additional information we should be aware of%0A ${additional}%0A%0A` : '';
        const str = main + mailStr + skypeStr + expStr + typesStr + countryStr + additionalStr;

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.telegram.org/" + API_KEY + "/sendMessage?chat_id=" + CHAT_ID + "&text=" + str,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            openSuccessInvite();
            const form = document.forms['signUpFormData'];
            form.elements['gmail'].value = '';
            form.elements['experience'].value = '';
            form.elements['traffic'].value = '';
            form.elements['country'].value = '';
            form.elements['additional'].value = '';
        });
        closeSignUpForm();
    }
}
