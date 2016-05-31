$(document).ready(function(){  

	site.news.initialize();

}); 

site.news = {
    id:"news",
	data:site.news_data,
    set_start:0,
    set_end:2,
    set_total:3,
    news_set:[],
    drawer_open:false,
    loading:false,
    transition_entry:-1,
    direction:"right",
    device_state:"",
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('#news').css({
            "width":"100%",
            "float":"left",
            "background-color":"#222",
            "color":"#000",
            "text-align":"center"
            });

        $('#news_container').css({
            "width":"100%",
            "float":"left",
            });

        $('#news_content').css({
            "float":"left",
            });

        $('#news_holder').css({
            "position":"relative",
            });

        $('#news_arrow_l').css({
            "float":"left",
            "cursor":"pointer"
            });        

        $('#news_arrow_l').click(function(event){
            thisobj.next("left");
        });

        $('#news_arrow_r').css({
            "float":"right",
            "cursor":"pointer"
            });

        $('#news_arrow_r').click(function(event){
            thisobj.next("right");
        });


        $('#news_drawer').css({
            "float":"left",
            "background" : "#000",
            "color":"#FFF",
            "width":"100%",
            "height":"0px",
            "overflow":"hidden"
            });


        this.set_articles();
            

        for (i = 0; i < this.news_set.length; i++) {
            site.trace("this.news_set[i] = "+this.news_set[i])
        }

        if(site.segments[0] == "news" && site.segments[1] != "") {
            TweenMax.delayedCall(1, thisobj.open_news, [site.segments[1]], this);
        }

        this.set_btns();
    	this.resize();


        
    },

    next : function (val) {
        
        site.trace("next val = "+val);
        
        var thisobj = this;
        var new_id = 0;
        var new_l = 0;

        if(this.loading) return;
        this.loading = true;

        this.direction = val;

        if(this.direction == "right") {

            
            new_id = this.news_set[this.news_set.length-1] + 1;

            if(new_id > this.data.length-1) new_id = 0;

            new_l = (this.news_img_w() + this.news_entry_lr()) * 3;

            this.news_set.push(new_id);


        } else {

            new_id = this.news_set[0] - 1;

            if(new_id < 0) new_id = this.data.length-1;

            new_l = (this.news_img_w() + this.news_entry_lr()) * -1;

            this.news_set.unshift(new_id);
        }

        site.trace("next            new_id = "+new_id+" tthis.news_set.length = "+this.news_set.length)
        

        $('#news_holder').append('<a href="/news/'+this.data[new_id].id+'" entry_id="'+this.data[new_id].id+'"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>');

        var new_content = new Image();  
        new_content.id = new_id;
        new_content.onload = function () {   

            thisobj.thumb_loaded(this.id);

        } 

        $('#'+this.data[new_id].id).css({
            "left":new_l+"px",
            "top":this.news_entry_tb()+"px",
            "opacity":"0"
            });

        $('#'+this.data[new_id].id).append('<div class="news_img"></div>');

        $('#'+this.data[new_id].id+" .news_img").append('<img src="'+this.data[new_id].img+'">');
        $('#'+this.data[new_id].id).append('<div class="news_info"></div>');
        $('#'+this.data[new_id].id+" .news_info").append('<div class="news_title">'+this.data[new_id].title+'</div>');
        $('#'+this.data[new_id].id+" .news_info").append('<div class="news_desc">'+this.data[new_id].short_desc+'</div>');

        $('#'+this.data[new_id].id+" .news_info").append('<div class="news_read_more">READ MORE</div>');


        $('#news_img img').css({
            "width":"100%",
            "height":"auto"
            });

        new_content.src = this.data[new_id].img;

        
    },

    set_articles : function () {

        var i;

        $('#news_holder').html('');
        this.news_set = [];

        if(site.device == "mobile") {
            this.news_set.push(0); 

            this.remove_entry(this.data[1].id); 
            this.remove_entry(this.data[2].id);    
        } else {
            for (i = 0; i < this.data.length; i++) { 
                if(i < 3) {
                    this.news_set.push(i);
                }
            } 
            
        }

        for (i = 0; i < this.news_set.length; i++) { 

            var new_id = this.news_set[i];
            $('#news_holder').append('<a href="/news/'+this.data[new_id].id+'" entry_id="'+this.data[new_id].id+'"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>');

            var new_content = new Image();  
            new_content.id = new_id;
            new_content.onload = function () {   

                

            } 

            $('#'+this.data[new_id].id).css({
                "opacity":"0"
                });

            $('#'+this.data[new_id].id).append('<div class="news_img"></div>');

            $('#'+this.data[new_id].id+" .news_img").append('<img src="'+this.data[new_id].img+'">');
            $('#'+this.data[new_id].id).append('<div class="news_info"></div>');
            $('#'+this.data[new_id].id+" .news_info").append('<div class="news_title">'+this.data[new_id].title+'</div>');
            $('#'+this.data[new_id].id+" .news_info").append('<div class="news_desc">'+this.data[new_id].short_desc+'</div>');

            $('#'+this.data[new_id].id+" .news_info").append('<div class="news_read_more">READ MORE</div>');


            $('#news_img img').css({
                "width":"100%",
                "height":"auto"
                });

            new_content.src = this.data[new_id].img;         
        } 

        this.set_btns();

    },

    thumb_loaded : function (val) {
        site.trace("thumb_loaded val "+val);

        this.set_btns();

        var entry_l;
        var entry_id;


            if(this.direction == "right") {
                entry_l = this.news_entry_lr() + this.news_img_w() * -1;
                entry_id = this.news_set[0];
                
            } else {
                entry_l = this.news_entry_lr() + this.news_img_w() * 4;
                entry_id = this.news_set[this.news_set.length-1];
            }

            site.trace("thumb_loaded --------  this.data[entry_id].id = "+this.data[entry_id].id+" entry_l = "+entry_l+" entry_id = "+entry_id)
            TweenMax.to($('#'+this.data[entry_id].id), .5, {left:entry_l+"px", opacity:0, onCompleteScope:this, onComplete:this.remove_entry, onCompleteParams:[this.data[entry_id].id], ease:"Power1.easeInOut", overwrite:2}); 


            if(this.direction == "right") {
                this.news_set.splice(0,1);
                site.trace("this.news_set.length = "+this.news_set.length)
                
            } else {
                this.news_set.pop();
            }

        this.resize();

        this.loading = false;
    },

    remove_entry : function (id) {
        site.trace("remove_entry id = "+id)

        $( "#news_holder a" ).each(function( index ) {


            
            var entry_id = $(this).attr('entry_id');
            site.trace("entry_id = "+entry_id +" id = "+id)

            if(entry_id == id) $(this).remove();
        });
    },

    open_news : function (val) {
        site.trace("open_news val = "+val)

        var i;
        var thisobj = this;

        if(this.drawer_open) {

            site.nav.scroll_to('#news');
            site.set_url("news");

            this.drawer_open = false;

            TweenMax.to($('#news_drawer'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id)
                if(this.data[i].id == val) {
                    $('#news_drawer').html('');
                    site.nav.scroll_to('#news_drawer');

                    site.set_url("news",this.data[i].id);
                    
                    $('#news_drawer').append('<div id="news_article"></div>');
                    $('#news_article').append('<div id="news_article_img"></div>');

                    var new_content = new Image();  
                    new_content.id = i;
                    new_content.onload = function () {   

                        thisobj.img_loaded(this.id);

                    } 

                    $('#news_article_img').append('<img src="'+this.data[i].img+'">');

                    $('#news_article').append('<span id="news_article_top"></span>');
                    $('#news_article_top').append('<span class="news_article_title">'+this.data[i].title+'</span>');
                    $('#news_article_top').append('<span id="news_article_close">X CLOSE</span>');
                    $('#news_article').append('<span class="news_article_desc">'+this.data[i].desc+'</span>');

                    $('#news_article_img').css({
                        "float":"left",
                        
                        });

                    $('#news_article_img img').css({
                        "width":"100%",
                        "height":"auto"
                        });

                    $('#news_article_close').css({
                        "float":"right",
                        "font-family":"sf_movie_posterbold",
                        "cursor":"pointer"
                        });

                    $('#news_article_close').click(function(event){
                        thisobj.open_news();
                        });

                    if(site.device == "desktop") {
                        $('#news_article_close').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('#news_article_close').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                           
                    new_content.src = this.data[i].img;
                    
                    this.resize();
                }
            }

            
            
        }

    },
    reset_article : function () {
        $('#news_drawer').html('')
    },

    img_loaded : function (val) {

        this.drawer_open = true;

        TweenMax.set($('#news_drawer'), {height:"auto", ease:"Power1.easeInOut", overwrite:2}); 
        TweenMax.from($('#news_drawer'), .5, {height:0, ease:"Power1.easeInOut", overwrite:2}); 

    },

    set_btns : function () {

        var thisobj = this;

        $('.news_entry').css({
            "position":"absolute",
            "color":"#FFF",
            "text-align":"center"
            });

        $('.news_img').css({
            "overflow":"hidden"
            });

        $('.news_img img').css({
            "width":"100%",
            "height":"auto",
            });

        $('.news_title').add('.news_read_more').css({
            "font-family":"sf_movie_posterbold",
            "text-transform":"uppercase"
            });

        $('#news_holder a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            thisobj.open_news(id);
        });

        

    },
         
    resize : function () {

    	site.trace("resize");

        var thisobj = this;

    	if(site.device == "mobile") {

            if(this.device_state != "mobile") {
                this.set_articles();
            }
            this.device_state = "mobile";    
            
    	} else {
            if(this.device_state != "desktop") {
                this.set_articles();
            }
            this.device_state = "desktop";       
    	}

            
        $('#news_arrow_l').add('#news_arrow_r').css({
            "width":this.arrow_w()+"px",
            "height":this.arrow_h()+"px",
            "margin":this.arrow_tb()+"px 0"
            });   


        $('.news_entry').css({
            "width":this.news_img_w()+"px",
            "margin":this.news_entry_tb()+"px "+this.news_entry_lr()+"px"
            });

        $('.news_img').css({
            "width":this.news_img_w()+"px",
            "height":this.news_img_h()+"px",
            });

        $('.news_title').css({
            "font-size":this.news_title_size()+"px",
            "line-height":this.news_title_leding()+"px",
            "margin-top":this.news_title_t()+"px"
            });

        $('.news_desc').css({
            "font-size":this.news_desc_size()+"px",
            "line-height":this.news_desc_leading()+"px",
            });

        var entry_count = 0;

        site.trace("this.news_set.length = "+this.news_set.length);

        for (i = 0; i < this.news_set.length; i++) {
            
            site.trace("=========      this.news_set[i] = "+this.news_set[i])

            var entry_l = (this.news_entry_lr() + this.news_img_w()) * entry_count;
            
            site.trace("entry_l = "+entry_l);

            TweenMax.to($('#'+this.data[this.news_set[i]].id), .5, {left:entry_l+"px", top:this.news_entry_tb()+"px", opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
            
            entry_count++;

                

            
        }

        $('.news_read_more').css({
            "font-size":this.news_read_more_size()+"px",
            "line-height":this.news_read_more_leading()+"px",
            "border-top":"1px solid #FFF",
            "margin":"0 auto",
            "width":"60%"
            });

        $('#news_article').css({
            "padding":this.news_article_img_rb()+"px",
            });

        $('#news_article_img').css({
            "width":this.news_article_img_w()+"px",
            "margin-right":this.news_article_img_rb()+"px",
            "margin-bottom":this.news_article_img_rb()+"px",
            });


        $('.news_article_title').css({
            "font-family":"sf_movie_posterbold",
            "text-transform":'uppercase',
            "font-size":this.news_article_title_size()+"px",
            "line-height":this.news_article_title_leading()+"px",
            });


        $('.news_article_desc').css({
            "font-size":this.news_article_desc_size()+"px",
            "line-height":this.news_article_desc_leading()+"px",
            });


        $('#news_article_close').css({
            "font-size":this.news_article_close_size()+"px",
            "line-height":this.news_article_close_leading()+"px",
            });

        $('#news_holder').css({
            "width":this.news_holder_w(),
            });

        
            
    },

    news_holder_w : function () {
        var value = 1364 * site.site_scale();;
        if(site.device == "mobile") value = site.window_width() * .7;
        return value;
    },

    news_article_close_size : function () {
        var value = 36 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    news_article_close_leading : function () {
        var value = 75 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    }, 

    news_article_desc_size : function () {
        var value = 16 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    },

    news_article_desc_leading : function () {
        var value = 32 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .07;
        return value;
    }, 

    news_article_title_size : function () {
        var value = 55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    news_article_title_leading : function () {
        var value = 75 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    }, 

    news_article_img_rb : function () {
        var value = 25 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .02;
        return value;
    },

    news_article_img_w : function () {
        var value = 600 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * 1;
        return value;
    },

    news_read_more_size : function () {
        var value = 33 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    news_read_more_leading : function () {
        var value = 48 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    }, 


    news_entry_tb : function () {
        var value = 10 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    }, 

    news_entry_lr : function () {
        var value = 35 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 

    news_desc_size : function () {
        var value = 16 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    }, 

    news_desc_leading : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 

    news_title_size : function () {
        var value = 66 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    }, 

    news_title_leding : function () {
        var value = 60 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .12;
        return value;
    }, 

    news_title_t: function () {
        var value = 10 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    }, 

    news_img_w : function () {
        var value = 400 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .7;
        return value;
    }, 

    news_img_h : function () {
        var value = (216/400) * this.news_img_w();
        return value;
    },  

    arrow_tb : function () {
        var value = 240 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .5;
        return value;
    }, 

    arrow_w : function () {
        var value = 68 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },  

    arrow_h : function () {
        var value = (114/68) * this.arrow_w();
        return value;
    },  
    

};
