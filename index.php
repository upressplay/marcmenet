<!DOCTYPE html>
<?php
	$cdn = "/";

	$segments = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/')); 

	$about_data  = file_get_contents('http://www.marcmenet.com/wordpress/api/sitedata/about/');
	$about_data = json_decode($about_data, true);	
	$about_data = $about_data['data'];
	
	$meta_title_default = 'Marc Menet - Cinematography';
	$meta_title = $meta_title_default;

	foreach ( $about_data as $a ) {
		$meta_title = $meta_title . " : " . $a['title'];
		$meta_desc_default = substr(strip_tags($a['desc']), 0, 300);
	}
	
	
	$meta_desc = $meta_desc_default;
	$site_url = "http://" . $_SERVER[HTTP_HOST];
	$meta_url = "http://" . $_SERVER[HTTP_HOST] . $_SERVER['REQUEST_URI'];
	$meta_img_default = $site_url . '/images/site_avatar.jpg';
	$meta_img = $meta_img_default;


	$work_data  = file_get_contents('http://www.marcmenet.com/wordpress/api/sitedata/work/');
	$work_data = json_decode($work_data, true);	
	$work_data = $work_data['data'];

	if($segments[0] == "work") {

		$meta_title = $meta_title_default . " : Work";
		
		foreach ( $work_data as $w ) {

			if($segments[1] == $w['id']) {
				$meta_title = $meta_title . " : " . $w['title'];
				$meta_desc = substr(strip_tags($w['desc']), 0, 300);
				$meta_img  = $w['img'];
			}	
		}
		
		

	}

	$news_data  = file_get_contents('http://www.marcmenet.com/wordpress/api/sitedata/news/');
	$news_data = json_decode($news_data, true);	
	$news_data = $news_data['data'];

	if($segments[0] == "news") {

		$meta_title = $meta_title_default . " : News";
		
		foreach ( $news_data as $n ) {

			if($segments[1] == $n['id']) {
				$meta_title = $meta_title . " : " . $n['title'];
				$meta_desc = substr(strip_tags($n['desc']), 0, 300);
				$meta_img  = $n['img'];
			}	
		}
		
		

	}

	$contact_data  = file_get_contents('http://www.marcmenet.com/wordpress/api/sitedata/contact/');
	$contact_data = json_decode($contact_data, true);	
	$contact_data = $contact_data['data'];

?>

<title><?php echo $meta_title; ?></title>
<meta name="description" content="<?php echo $meta_desc; ?>"> 
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
<meta property="og:title" content="<?php echo $meta_title; ?>" />
<meta property="og:description" content="<?php echo $meta_desc; ?>" />
<meta property="og:url" content="<?php echo $meta_url; ?>"/>
<meta property="og:image" content="<?php echo $meta_img; ?>" />

<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
<link rel="manifest" href="/favicon/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">

<link href="/favicon/favicon.ico" rel="shortcut icon" type="image/x-icon">

<meta name="viewport" content="width=device-width, user-scalable=no">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" media="all" href="/css/site.css" />
<html>
<head>
</head>

<body>
<div id="site_holder">
	<div id="site_container">
		<div id="home">
			<img src="/images/home_background.jpg">	
			<div id="about">
				<?php 

				$count = 0;
				foreach ( $about_data as $a ) {
					if($count<1) {
						echo '<div class="white_title">';
						echo $a['title'];
						echo '</div>';
						echo '<div class="white_desc">';
						echo $a['desc'];
						echo '</div><!-- white_desc -->';	
					}
					
					$count++;
				}
				?>
			</div><!-- home_info -->
		</div><!-- home -->
		
		<div id="work">
			<div class="black_section_title">
				THE WORK
			</div><!-- black_section_title -->
			<div id="work_holder">

				<?php 

				$work_count = 0;
				$side_count = 0;

				foreach ( $work_data as $w ) {
					if($work_count < 3) {
						if($side_count == 0) {
							echo '<a href="/work/'.$w['id'].'" entry_id="'.$w['id'].'">';
							echo '<div class="work_entry left" id="'.$w['id'].'">';

							echo '<div class="work_img">';
							echo '<img src="'.$w['img'].'">';
							echo '</div><!-- work_img -->';

							echo '<div class="work_info">';
							echo '<div class="work_title">';
							echo $w['title'];
							echo '</div><!-- work_title -->';
							echo '<div class="work_desc">';
							echo $w['desc'];
							echo '</div><!-- work_desc -->';
							echo '</div><!-- work_info -->';

							echo '</div><!-- work_entry -->';
							echo '</a>';
						} else {
							echo '<a href="/work/'.$w['id'].'" entry_id="'.$w['id'].'">';
							echo '<div class="work_entry right" id="'.$w['id'].'">';
							
							echo '<div class="work_info_right">';
							echo '<div class="work_title">';
							echo $w['title'];
							echo '</div><!-- work_title -->';
							echo '<div class="work_desc">';
							echo $w['desc'];
							echo '</div><!-- work_desc -->';
							echo '</div><!-- work_info -->';
							
							echo '<div class="work_img">';
							echo '<img src="'.$w['img'].'">';
							echo '</div><!-- work_img -->';

							echo '</div><!-- work_entry -->';
							echo '</a>';	
						}
						$work_count++;
						$side_count++;
						if($side_count == 2) $side_count = 0;	
					}
					
				}

				?>
				
			</div><!-- work_holder -->
			<div id="load_more">
				<div id="load_more_btn">
					LOAD MORE
				</div><!-- load_more_btn -->
			</div><!-- load_more -->
		</div><!-- work -->
		<div id="news">
			<div class="white_seciton_title">
				THE NEWS
			</div><!-- white_seciton_title -->
			<div id="news_container">
				<div id="news_arrow_l">
					<img src="/images/arrow_l.png">
				</div><!-- news_arrow_l -->

				<div id="news_content">
					<div id="news_holder">

					<?php 
						$news_count = 0;
						foreach ( $news_data as $n ) {

							if($news_count <3) {
								echo '<a href="/news/'.$n['id'].'" entry_id="'.$n['id'].'">';
								echo '<div class="news_entry" id="'.$n['id'].'">';

								echo '<div class="news_img">';
								echo '<img src="'.$n['img'].'">';
								echo '</div><!-- news_img -->';

								echo '<div class="news_info">';
								echo '<div class="news_title">';
								echo $n['title'];
								echo '</div><!-- news_title -->';
								echo '<div class="news_desc">';
								echo $n['short_desc'];
								echo '</div><!-- news_desc -->';
								echo '<div class="news_read_more">';
								echo 'READ MORE';
								echo '</div><!-- news_read_more -->';
								echo '</div><!-- news_info -->';

								echo '</div><!-- news_entry -->';
								echo '</a>';	
							}
						
							$news_count++;

						}
					?>
					
					</div><!-- news_holder -->
				</div><!-- news_content -->
				<div id="news_arrow_r">
					<img src="/images/arrow_r.png">
				</div><!-- news_arrow_r -->
			</div>
		</div><!-- news -->
		<div id="news_drawer">

		</div>
		<div id="contact">
			<div class="white_seciton_title">
				CONTACT
			</div><!-- white_seciton_title -->
			<div id="contact_content">
				<div id="contact_form">

					<div class="form_title">
						NAME
					</div><!-- form_title -->
					<div class="form_element">
						<input id="contact_name" type="text">
					</div><!-- form_title -->

					<div class="form_title">
						EMAIL
					</div><!-- form_title -->
					<div class="form_element">
						<input type="email" id="contact_email" name="user_email">
					</div><!-- form_title -->

					<div class="form_title">
						MESSAGE
					</div><!-- form_title -->
					<div class="form_element">
						<textarea id="contact_message" name="user_message"></textarea>
					</div><!-- form_title -->
					<div id="form_message">
						 
					</div><!-- form_message -->

					<div id="contact_btn">
						 Contact
					</div><!-- form_title -->
					
				</div><!-- contact_form -->
				<div id="contact_phone">
					<div id="contact_phone_title">
						PHONE
					</div>
					<?php 
						foreach ( $contact_data as $c ) {
							echo '<div class="contact_person">';
							echo $c['title'] . " : " . $c['phone'];
							echo '</div><!-- contact_person -->';
						}
					?>
				</div><!-- contact_phone -->
			</div><!-- contact_content -->
		</div><!-- contact -->

		<div id="footer">
			<div id="footer_holder">
			
				
				<div id="top_btn">
					<img src="/images/top_btn.png">
				</div><!-- top_btn -->

			</div><!-- footer_holder -->
			<div id="copyright">
					©2016 Marc Menet - All rights reserved
				</div><!-- copyright -->
		</div><!-- footer -->

	</div><!-- site_container -->
	
</div><!-- site_holder -->
<div id="site_logo">
	<img src="/images/site_logo.png">
</div>
<div id="top_nav">
	<div id="nav_btns">
	<a href="/about" class="nav_link">
	<div class="nav_btn">
		ABOUT
	</div>
	</a>
	<a href="/work" class="nav_link">
	<div class="nav_btn">
		WORK
	</div>
	</a>
	<a href="/news" class="nav_link">
	<div class="nav_btn">
		NEWS
	</div>
	</a>
	<a href="/contact" class="nav_link">
	<div class="nav_btn">
		CONTACT
	</div>
	</a>

	<a href="https://www.facebook.com/pages/Pan-and-Tilt-Productions/641776989249595?fref=ts" target="blank">
	<div class="fa fa-facebook-official social_btn"></div>
	</a>

	<a href="https://instagram.com/marcmenet/" target="blank">
	<div class="fa fa-instagram social_btn"></div>
	</a>
	<a href="http://www.imdb.com/name/nm1421061/" target="_blank">
      <div class="img_btn">
        <div class="img_btn_holder">
          <div class="img_btn_rest"><img src="/images/imdb_btn_rest.png"></div>
          <div class="img_btn_roll"><img src="/images/imdb_btn_roll.png"></div>
        </div>
      </div>
      </a>


	
</div><!-- nav_btns -->
</div><!-- top_nav -->

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/plugins/ScrollToPlugin.min.js"></script>

<script src="/js/site.js"></script>
<script>
<?php 

	$js_segments = json_encode($segments);
	echo "site.segments = ". $js_segments . ";\n"; 

	$news_data = json_encode($news_data, true);
	echo "site.news_data = ". $news_data . ";\n"; 

	$work_data = json_encode($work_data, true);
	echo "site.work_data = ". $work_data . ";\n"; 

?>
</script>
<script src="/js/common.js"></script>
<script src="/js/nav.js"></script>
<script src="/js/home.js"></script>
<script src="/js/team.js"></script>
<script src="/js/work.js"></script>
<script src="/js/news.js"></script>
<script src="/js/contact.js"></script>
<script src="/js/footer.js"></script>
</body>

</html>