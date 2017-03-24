(function ($) {
    "use strict";

// ***
// *  Obsługa cookies
// ***

$(document).on('ready', function() {
    var CookiesPolicyManager = {

    findCookie: function (cookieName) {
        var name, value, i;
        var cookies=document.cookie.split(";");
        for (i=0; i < cookies.length; i++) {
            name = cookies[i].substr(0, cookies[i].indexOf("="));
            name = name.replace(/^\s+|\s+$/g,"");
            name = unescape(name);
            if (name == cookieName) {
                value = cookies[i].substr(cookies[i].indexOf("=")+1);
                return value;
            }
        }
        return null;
    },

    showCookiesPolicyPopup : function(popupId, cookieName) {
        if (CookiesPolicyManager.findCookie(cookieName) === null) {
             $("." + popupId).fadeIn("fast");
        }
    },

    setCookiesPolicyPopupDisabled: function(popupId, cookieName) {
                var expireDate=new Date();
                expireDate.setDate(expireDate.getDate() + 365);
                document.cookie=escape(cookieName) + "=" + "true; expires=" + expireDate.toUTCString();
                $("." + popupId).fadeOut("fast");
        }
    };

    CookiesPolicyManager.showCookiesPolicyPopup('js-cookies-policy', 'cookiesPolicyAccepted');

    $(".js-cookies-policy__close").on("click", function(e) {
        CookiesPolicyManager.setCookiesPolicyPopupDisabled('js-cookies-policy',
        'cookiesPolicyAccepted');
        return e.preventDefault();
    });

});

}(jQuery))