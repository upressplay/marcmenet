$(document).ready(function(){  

	site.work.initialize();

}); 

site.work = {
    id:"work",
	overlay_open:false,
    data:site.work_data,
    set_start:0,
    set_end:2,
    set_total:3,
    loading:false,

	initialize : function () {
        site.trace("this.data = "+this.data+" site.work_data = "+site.work_data);

		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('#work').css({
            "background-color":"#FFF",
            "color":"#000",
            "text-align":"center",
            "float":"left",
            "width":"100%"
            });        

        $('#load_more').css({
            "width":"100%",
            "float":"left",
            "display":"table"
            });

        $('#load_more_btn').css({
            "display":"inline-block",
            "background-color":"#b5b5b5",
            "font-family":"sf_movie_posterbold",
            "color":"#000",
            "cursor":"pointer"
            });

        $('#load_more_btn').click(function(event){
            thisobj.load_more();
        });

        if(site.device == "desktop") {
            $('#load_more_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#FFF", backgroundColor:"#000", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#load_more_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#000", backgroundColor:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        if(site.segments[0] == this.id && site.segments[1] != undefined) {
            TweenMax.delayedCall(1, thisobj.open_work, [site.segments[1]], this);
        }

        
        this.set_btns();
    	this.resize();

    },

    load_more : function () {

        site.trace("load_more this.set_start = "+this.set_start+" this.set_end = "+this.set_end);

        if(this.loading) return;
        this.loading = true;

        this.set_start = this.set_start + this.set_total;
        this.set_end = this.set_end + this.set_total;

        site.trace("load_more this.set_start = "+this.set_start+" this.set_end = "+this.set_end);

        if(this.set_end >= this.data.length-1) {

            this.set_end = this.data.length-1;
            TweenMax.to($( '#load_more_btn'), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#load_more_btn','none'], ease:"Power1.easeInOut", overwrite:2}); 
        }

        site.trace("load_more this.set_start = "+this.set_start+" this.set_end = "+this.set_end);

        this.imgs_loaded = 0;
        this.imgs_to_load = 0;

        var i;
        var thisobj = this;

        var total_visible = $( ".work_entry" ).length;
        site.trace("total_visible = "+total_visible)
        total_visible = total_visible % 2;
        site.trace("total_visible = "+total_visible)
        var side_count = 1;

        if(total_visible == 0) {
            side_count = 0;
        }

        site.trace("side_count = "+side_count)
        for (i = 0; i < this.data.length; i++) {

            if(i >= this.set_start &&  i <= this.set_end) {

                this.imgs_to_load++;

                site.trace("side_count = "+side_count)

                if(side_count == 0) {
                    $('#work_holder').append('<a href="/work/'+this.data[i].id+'" entry_id="'+this.data[i].id+'"><div id="'+this.data[i].id+'" class="work_entry left"></div></a>');

                } else {
                    $('#work_holder').append('<a href="/work/'+this.data[i].id+'" entry_id="'+this.data[i].id+'"><div id="'+this.data[i].id+'" class="work_entry right"></div></a>');
                }

                

                TweenMax.set($( '#'+this.data[i].id), {opacity:0}); 

                var new_content = new Image();  
                new_content.id = i;
                new_content.onload = function () {   

                    thisobj.thumb_loaded(this.id);

                } 

                if(side_count == 0) {
                    
                    $( '#'+this.data[i].id).append('<div class="work_img"></div>');
                    $( '#'+this.data[i].id+' .work_img').append('<img src="'+this.data[i].img+'">');

                    $( '#'+this.data[i].id).append('<div class="work_info"></div>');
                    $( '#'+this.data[i].id+' .work_info').append('<div class="work_title">'+this.data[i].title+'</div>');
                    $( '#'+this.data[i].id+' .work_info').append('<div class="work_desc">'+this.data[i].desc+'</div>');   

                } else {
                    

                    $( '#'+this.data[i].id).append('<div class="work_info_right"></div>');
                    $( '#'+this.data[i].id+' .work_info_right').append('<div class="work_title">'+this.data[i].title+'</div>');
                    $( '#'+this.data[i].id+' .work_info_right').append('<div class="work_desc">'+this.data[i].desc+'</div>');

                    $( '#'+this.data[i].id).append('<div class="work_img"></div>');
                    $( '#'+this.data[i].id+' .work_img').append('<img src="'+this.data[i].img+'">');
   
                }

                new_content.src = this.data[i].img;

                side_count++;
                if(side_count > 1) side_count = 0;   

            }

        }

        this.set_btns();
        this.resize();

    },

    
    thumb_loaded : function (id) {

        site.trace("thumb_loaded id = "+id)
        var i;

        for (i = 0; i < this.data.length; i++) {
            if(id == i) {
               this.imgs_loaded++;
            }
        }  
        site.trace("this.imgs_loaded = "+this.imgs_loaded+" this.imgs_to_load = "+this.imgs_to_load)
        if(this.imgs_loaded == this.imgs_to_load) {
            this.thumbs_open();       
        }
    },

    thumbs_open : function () {
        site.trace("thumbs_open")


        var i;
        var delay = 0;

        for (i = 0; i < this.data.length; i++) {
            site.trace("i = "+i+" this.set_start = "+this.set_start+" this.set_end = "+this.set_end)
            if(i >= this.set_start && i <= this.set_end) {
                TweenMax.to($( '#'+this.data[i].id), .5, {delay:delay, opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
                delay = delay + .25;
            }
            
        } 
        
        this.loading = false; 
        this.resize();
    },

    set_btns : function () {

        site.trace("set_btns");

        var thisobj = this;

        $('.work_img').css({
            "float":"left",
            "overflow":"hidden"
            });

        $('.work_img img').css({
            "width":"100%",
            "height":"auto",
            "overflow":"hidden"
            });

        $('.work_info').add('.work_info_right').css({
            "float":"left",
            });

        $('.work_entry').css({
            "width":"100%",
            "float":"left",
            "color":"#333",
            "cursor":"pointer"
            });

        $('#work_holder').css({
            "display":"table",
            "margin":"0 auto",
            });

        $('#work_holder a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            site.trace("id = "+id)
            thisobj.open_work(id);
        });

        if(site.device == "desktop") {
            $('.work_entry').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.work_entry').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#444", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }


        $('.work_entry.left').css({
            "text-align":"left",
            });

        $('.work_entry.right').css({
            "text-align":"right",
            });

        $('.work_title').css({
            "font-family":"sf_movie_posterbold",
            
            });

    },

    open_work : function (val) {
        site.trace("open_work val = "+val)

        var i;
        var thisobj = this;

        if(this.overlay_open) return;
        this.overlay_open = true;


        for (i = 0; i < this.data.length; i++) {

            site.trace("open_work this.data[i].id = "+this.data[i].id+" val = "+val)
            if(this.data[i].id == val) {
                site.nav.scroll_to('#'+this.id);
                site.set_url(this.id,this.data[i].id);

                $('body').append('<div id="video_overlay"></div>');

                $('#video_overlay').css({
                    "position":"absolute",
                    "top":"0px",
                    "left":"0px",
                    "z-index":"300"
                    });
                $('#video_overlay').append('<div id="video_background"></div>');

                $('#video_background').css({
                    "position":"absolute",
                    "background-color":"rgba(0, 0, 0, .8)",
                    "cursor":"pointer"
                    });

                 $('#video_background').click(function(event){
                    thisobj.close_work();
                });

                $('#video_overlay').append('<div id="vid_player"></div>');

                site.trace("this.data[i].vid_type = "+this.data[i].vid_type+" this.data[i].vid_id = "+this.data[i].vid_id)
                if(this.data[i].vid_type =="vimeo") {
                    $('#vid_player').append('<iframe id="vid_iframe" src="//player.vimeo.com/video/'+this.data[i].vid_id+'?autoplay=1" width="'+this.vid_player_w()+'" height="'+this.vid_player_h()+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

                } else {
                    $('#vid_player').append('<iframe id="vid_iframe" width="'+this.vid_player_w()+'" height="'+this.vid_player_h()+'" src="//www.youtube.com/embed/'+this.data[i].vid_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');   
      
                }
                
                
                $('#vid_player').css({
                    "position":"absolute",
                    "background-color":"#000"
                    }); 

                TweenMax.from($( '#video_overlay' ), .25, {delay:.25, opacity:"0", ease:"Power1.easeInOut", overwrite:2}); 

      
                this.resize();
            }
        }

        


    },
    close_work : function () {

        site.trace("close_work");

        this.overlay_open = false;

        site.set_url(this.id);

        TweenMax.to($( '#video_overlay' ), .25, {opacity:"0", onComplete:this.reset_work, onCompleteScope:this, ease:"Power1.easeInOut", overwrite:2}); 

    },

    reset_work : function () {

        site.trace("reset_work")

        $('#video_overlay').remove();

    },
         
    resize : function () {

    	
    	if(site.device == "mobile") {
             $( ".work_entry" ).each(function( index ) {
            
                var id = $(this).attr('id');
                site.trace("mobile id = "+id);

                $("#"+id+" .work_img" ).insertBefore( $("#"+id+" .work_info_right" ));  
            });

             $( ".work_entry.right").css({
                "text-align":"left"
             });
            
    	} else {
            $( ".work_entry" ).each(function( index ) {
            
                var id = $(this).attr('id');
                site.trace("desktop id = "+id);

                $("#"+id+" .work_info_right" ).insertBefore( $("#"+id+" .work_img" ));  
            });

            $( ".work_entry right").css({
                "text-align":"right"
             });


            
    	}

        $('.work_img').css({
            "width":this.work_img_w()+"px",
            "height":this.work_img_h()+"px"
            });

        $('.work_info').add('.work_info_right').css({
            "width":this.work_info_w()+"px",
            "padding":this.work_info_p_tb()+"px "+this.work_info_p_lr()+"px"
            });

        $('.work_title').css({
            "font-size":this.work_title_size()+"px",
            "line-height":this.work_title_leading()+"px"
            });
        
        $('.work_desc').css({
            "font-size":this.work_desc_size()+"px",
            "line-height":this.work_desc_leading()+"px"
            });
        
        $('#load_more_btn').css({
            "font-size":this.load_more_btn_size()+"px",
            "padding":this.load_more_btn_tb()+"px "+this.load_more_btn_lr()+"px",
            "letter-spacing":this.load_more_btn_spacing()+"px",
            });

         TweenMax.set($('#load_more_btn'), {borderRadius:this.load_more_btn_border()+"px"});

        $('#load_more').css({
            "margin":this.load_more_tb()+"px 0px"
            });

         $('#video_overlay').css({
            "width":site.window_width()+"px",
            "height":site.window_height()+"px"
            });

         $('#video_background').css({
            "width":site.window_width()+"px",
            "height":site.window_height()+"px"
            });

         $('#vid_player').css({
            "width":this.vid_player_w()+"px",
            "height":this.vid_player_h()+"px",
            "top":this.vid_player_t()+"px",
            "left":this.vid_player_l()+"px"
            });

         $('#vid_iframe').css({
            "width":this.vid_player_w()+"px",
            "height":this.vid_player_h()+"px",
            });

         $(".work_entry").css({
            "margin":"0px "+this.work_entry_lr()+"px "+this.work_entry_b()+"px "+this.work_entry_lr()+"px",
             });

    },
    work_entry_b : function () {
        var value = 0 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 


    work_entry_lr : function () {
        var value = 80 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * 0;
        return value;
    }, 

    vid_player_w : function () {
        var value = 1000 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .9;
        return value;
    }, 

    vid_player_h : function () {
        var value = 562/1000 * this.vid_player_w();
        return value;
    }, 

    vid_player_t : function () {
        var value =  (site.window_height() - this.vid_player_h())/2;
        if(value < 0) value = 0;
        return value;
    }, 

    vid_player_l : function () {
        var value =  (site.window_width() - this.vid_player_w())/2;
        if(value < 0) value = 0;
        return value;
    }, 


    load_more_btn_border : function () {
        var value = 40 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    }, 

    load_more_tb : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    }, 

    load_more_btn_tb : function () {
        var value = 15 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    }, 

    load_more_btn_lr : function () {
        var value = 80 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    }, 

    load_more_btn_size : function () {
        var value = 60 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    

    load_more_btn_spacing : function () {
        var value = 4 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    }, 

    work_desc_size : function () {
        var value = 16 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    work_desc_leading : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },   

    work_title_size : function () {
        var value = 72 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    work_title_leading : function () {
        var value = 100 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .12;
        return value;
    },   

    work_info_w : function () {
        var value = 540 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .9;
        return value;
    },

    work_info_p_tb : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    }, 

    work_info_p_lr : function () {
        var value = 60 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },    

    work_img_w : function () {
        var value = 660 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * 1;
        return value;
    },

    work_img_h : function () {
        var value = (359/660) * this.work_img_w();
        return value;
    },

};
