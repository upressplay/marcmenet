$(document).ready(function(){  

	site.contact.initialize();

}); 

site.contact = {
	
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("contact render");

        $('#contact').css({
            "float":"left",
            "width":"100%",
            "background-color":"#000",
            "color":"#FFF",
            
            "text-align":"center"
            });

        $('#contact_content').css({
            "float":"left",
            });

        $('#contact_form').css({
            "float":"left",
            });

        $('#contact_phone').css({
            "float":"left",
            });

        $('.form_title').css({
            "text-align":"left",
            "font-family":"sf_movie_posterbold",
            });

        $('#contact_phone_title').css({
            "text-align":"left",
             "font-family":"sf_movie_posterbold",
            });

        $('.contact_person').css({
            "text-align":"left",
            "text-transform":"uppercase",
            "font-family":"sf_movie_posterbold",
            });

        $('input').add('textarea').css({
            "float":"left",
            "width":"100%"
            });

        $('#contact_btn').css({
            "float":"left",
            "font-family":"sf_movie_posterbold",
            "background-color":"#4d4d4d",
            "color":"#FFF",
            "border":"0",
            "text-transform":"uppercase"
            });

        $('#contact_btn').click(function(event){
            thisobj.send_email();
        });

        
        $('#form_message').css({
            "color":"#ff0000",
            "float":"left",
            "width":"100%",
            "text-align":"left"
            });

    	this.resize();
        
    },

    send_email : function () {
        var valid = true;
        var form_message = "";

        var name = $('#contact_name').val();

        if(name == "" || name.length < 5) {
            valid = false;
            form_message = form_message + "Please enter a valid Name. "
        }

        var message = $('#contact_message').val();

        if(message == "" || message.length < 5) {
            valid = false;
            form_message = form_message + "Please enter a valid Message. "
        }

        var email = $('#contact_email').val();

        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var pattern_number = /[0-9]/g;
        var pattern_letter = /[A-z]/g;
        var pattern_spaces = /\s/g;

        var email_validation = email.match(pattern);

        if(!email_validation) {
            valid = false;
            form_message = form_message + "Please enter a valid Email. "  
        }
        


        site.trace("email_validation = "+email_validation+" valid = "+valid)
        if(valid) {
            $.ajax({
                type:"POST",
                data: {
                         "name":name,
                         "email":email,
                         "message":message,
                    },
                url:"process.php",
                success: function() {
                    site.trace("form success")
                     $('#form_message').css({
                        "color":"#00baff",
                        });
                    $('#form_message').html('Thank you for contacting Pan & Tilt. Someone will get back to you shortly.');  
                },
                error: function() {
                    $('#form_message').css({
                        "color":"#ff0000",
                        });
                    $('#form_message').html('There was an error sending your message, please try again.');
                }
            });
        } else {
            $('#form_message').css({
                "color":"#ff0000",
                });
            $('#form_message').html(form_message);     
        }
    },


    open_bio : function (val) {
        site.trace("open_bio val = "+val)
    },
         
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        
        

        $('.form_title').add('#contact_phone_title').css({
            "font-size":this.form_title_size()+"px",
            "line-height":this.form_title_leading()+"px",
            });

        $('#contact_form').add('#contact_phone').css({
            "margin":"0px "+this.contact_content_m()+"px",
            });

        $('#contact_content').css({
            "margin":"0px "+this.contact_content_m()+"px "+this.contact_content_m()+"px "+this.contact_content_m()+"px",
            });

        $('#contact_form').css({
            "width":this.contact_form_w()+"px",
            });

        $('#contact_phone').css({
            "width":this.contact_phone_w()+"px",
            });

        $('.contact_person').css({
            "font-size":this.contact_person_size()+"px",
            "line-height":this.contact_person_leading()+"px",
            });

        

        $('input').add('textarea').css({
            "font-size":this.form_size()+"px",
            "line-height":this.form_leading()+"px",
            });

        $('#contact_btn').css({
            "font-size":this.button_size()+"px",
            "padding":this.button_p()+"px",
            "margin":this.button_m()+"px 0",
            "letter-spacing":this.button_spacing()+"px",
            });

        $('textarea').css({
            "height":this.textarea_h()+"px",
            });

        $('#form_message').css({
            "font-size":this.form_message_size()+"px",
            "line-height":this.form_message_leading()+"px",
            "height":this.form_message_h()+"px",
            });    
    },

    form_message_h : function () {
        var value = 35 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    },


    form_message_size : function () {
        var value = 14 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    form_message_leading : function () {
        var value = 35 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    },

    
    textarea_h : function () {
        var value = 150 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .2;
        return value;
    },

    button_spacing : function () {
        var value = 2 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    },

    form_size : function () {
        var value = 17 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },
    form_leading : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    button_p : function () {
        var value = 10 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    button_m : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    button_size : function () {
        var value = 36 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .07;
        return value;
    },

    button_leading : function () {
        var value = 55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    contact_person_size : function () {
        var value = 36 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    contact_person_leading : function () {
        var value = 50 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },

    contact_phone_w : function () {
        var value = 500 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .85;
        return value;
    },

    contact_form_w : function () {
        var value = 660 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .85;
        return value;
    },


    contact_content_m : function () {
        var value = 50 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },


    form_title_size : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    form_title_leading : function () {
        var value = 55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .14;
        return value;
    },
   

};
