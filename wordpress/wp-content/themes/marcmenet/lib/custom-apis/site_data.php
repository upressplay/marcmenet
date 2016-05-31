<?php
class json_api_sitedata_controller {
/**put your functions here to return data e.g.  Do the WP queries and then return on the info you want in a loop*/
	
	public function contact () {

		query_posts( array ( 'post_type' => 'contact' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'phone' => get_field('contact_number'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}

	public function about () {

		query_posts( array ( 'post_type' => 'about' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'desc' => get_field('about_desc'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);
	}


	public function news () {

		query_posts( array ( 'post_type' => 'news' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('news_img'),
				'news_header' => get_field('news_header'),
				'desc' => get_field('news_desc'),
				'short_desc' => get_field('news_short_desc'),
				'ext_link' => get_field('news_ext_link'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);


	}

	

	public function work () {

		query_posts( array ( 'post_type' => 'work' ) );

		$data = array();

		while ( have_posts() ) : the_post();

			$post = get_post(get_the_ID());

			$entry = array(
				'id' => $post->post_name,
				'title' => get_the_title(),
				'img' => get_field('work_image'),
				'desc' => get_field('work_desc'),
				'vid_id' => get_field('work_vid_id'),
				'vid_type' => get_field('work_vid_type'),
				);
			$data[] = $entry;
		endwhile;

		return array(
			'status' => 'ok',
			'data' => $data
		);



	}



}

?>