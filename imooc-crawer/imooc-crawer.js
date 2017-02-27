var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html);
	
	var chapters = $('.chapter');
	
	
	var courseData = []
	chapters.each(function(item){
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li')
		
		chapterTitle = chapterTitle.replace(/ /g,'').replace(/\r\n/g,'');
		var chapterData = {
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(item){
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1];
			videoTitle = videoTitle.replace(/ /g,'').split('\n');
			videoTitle = videoTitle[2].replace(/\r/,'') + videoTitle[3].replace(/\r/,'')
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})
		courseData.push(chapterData);
	})
	return courseData;
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle
		
		console.log(chapterTitle + '/n')
		item.videos.forEach(function(video){
			console.log('[' + video.id + ']' + video.title + '/n');
		})
	})
}
http.get(url,function(res){
	var html = '';
	res.on('data',(data) =>{
		html += data;
	});
	
	res.on('end',() => {
		courseData = filterChapters(html);
		
		printCourseInfo(courseData);
	});
}).on('error',() => {
	console.log('获取课程数据出错');
});