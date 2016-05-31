$(document).ready(function(){  

	site.team.initialize();

}); 

site.team = {
    data:site.team_data,
	drawer_open:false,
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('#team').css({
            "background-size":"100% auto",
            "background-repeat":"no-repeat",
            "color":"#fff",
            "font-family":"sf_movie_posterbold",
            "text-align":"center"
            });

        $('#team_section_title').add('#menet').add('#packo').css({
            "float":"left",
            });

        $('.bio_btn').css({
            "cursor":"pointer"
            });

        $('#menet .bio_btn').click(function(event){
            thisobj.open_bio("menet");
        });

        $('#packo .bio_btn').click(function(event){
            thisobj.open_bio("packo");
        });

        if(site.device == "desktop") {
            $('.bio_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.bio_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        $('#team_drawer').css({
            "background" : "#222",
            "color":"#FFF",
            "height":"0px",
            "overflow":"hidden"
            });

        $('.bio').css({
            "display":"none"
            });

        $('.bio_top').css({
            "float":"left",
            "width":"100%",
            });

        $('.bio_title').css({
            "float":"left",
            "font-family":"sf_movie_posterbold",
            });

        $('.bio_close').css({
            "float":"right",
            "font-family":"sf_movie_posterbold",
            "cursor":"pointer"
            });

        $('.bio_close').click(function(event){
            thisobj.open_bio();
        });

        if(site.device == "desktop") {
            $('.bio_close').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.bio_close').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }
        

    	this.resize();
        
    },

    open_bio : function (val) {
        site.trace("open_bio val = "+val);

        if(this.drawer_open) {

            this.drawer_open = false;

            site.nav.scroll_to('#team');

            TweenMax.to($('#team_drawer'), .5, {height:0, ease:"Power1.easeInOut", overwrite:2}); 
        } else {

            site.nav.scroll_to('#team_drawer');

            $('.bio').css({
                "display":"none"
                });

            $('#'+val+'_bio').css({
                "display":"block"
                });

            this.drawer_open = true;

            TweenMax.set($('#team_drawer'), {height:"auto", ease:"Power1.easeInOut", overwrite:2}); 
            TweenMax.from($('#team_drawer'), .5, {height:0, ease:"Power1.easeInOut", overwrite:2}); 
        }

    },
         
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        $('#team').css({
            "height":this.team_h()+"px",
            });

        $('#team_section_title').css({
            "font-size":this.team_section_title_size()+"px",
            "margin-top":this.team_section_title_t()+"px",
            "margin-left":this.team_section_title_l()+"px"
            });

       

        $('#menet').css({
            "margin-top":this.menet_t()+"px",
            "margin-left":this.menet_l()+"px"
            });

        $('#packo').css({
            "margin-top":this.packo_t()+"px",
            "margin-left":this.packo_l()+"px"
            });

        $('.team_name').css({
            "font-size":this.team_name_size()+"px",
            "line-height":this.team_name_leading()+"px",
            });

        $('.team_title').css({
            "font-size":this.team_title_size()+"px",
            "line-height":this.team_title_leading()+"px",
            "letter-spacing":this.team_title_spacing()+"px",
            });

        $('.bio_btn').css({
            "font-size":this.bio_btn_size()+"px",
            "line-height":this.bio_btn_leading()+"px",
            "border-top":this.bio_btn_border()+"px solid #FFF",
            "letter-spacing":this.team_title_spacing()+"px",
            "width":this.bio_btn_w()+"px",
            "margin":this.bio_btn_t()+"px auto"
            });

        $('.bio').css({
            "padding":this.bio_p()+"px"
            });

        $('.bio_desc').css({
            "font-size":this.bio_size()+"px",
            "line-height":this.bio_leading()+"px",
            });

        $('.bio_title').css({
            "font-size":this.bio_title_size()+"px",
            "line-height":this.bio_title_leading()+"px",
            });

        $('.bio_close').css({
            "font-size":this.bio_close_size()+"px",
            "line-height":this.bio_title_leading()+"px",
            });

    },

    bio_close_size : function () {
        var value = 40 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    bio_title_tb : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .02;
        return value;
    },

    bio_title_size : function () {
        var value = 55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    bio_title_leading : function () {
        var value = 55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },

    bio_p : function () {
        var value = 100 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .07;
        return value;
    },

    bio_size : function () {
        var value = 14 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    bio_leading : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },


    bio_btn_t : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    },

    bio_btn_size : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    bio_btn_leading : function () {
        var value = 48 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },
    bio_btn_border : function () {
        var value = 2 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .005;
        return value;
    },

    bio_btn_w : function () {
        var value = 142 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .15;
        return value;
    },

    team_title_size : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .025;
        return value;
    },

    team_title_leading : function () {
        var value = 36 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },
    team_title_spacing : function () {
        var value = 3 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * 0;
        return value;
    },

    team_name_size : function () {
        var value = 48 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    team_name_leading : function () {
        var value = 60 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    packo_t : function () {
        var value = 420 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .21;
        return value;
    },

    packo_l : function () {
        var value = 90 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },



    menet_t : function () {
        var value = 366 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .19;
        return value;
    },

    menet_l : function () {
        var value = 230 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .24;
        return value;
    },

    

    team_section_title_size : function () {
        var value = 180 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    },

    team_section_title_t : function () {
        var value = 290 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .12;
        return value;
    },

    team_section_title_l : function () {
        var value = 240 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .13;
        return value;
    },

    team_h : function () {
        var value = 640 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .4;
        return value;
    },

};
