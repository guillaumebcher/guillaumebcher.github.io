			$(document).ready(function(){
				var iW = $('.video').width(),
					iH = $('.video').height(),
					wW = $(window).width() - iW,
					wH = $(window).height() - iH,
					arr = [],
					tab = [],
					n = 0,
					more = 1000,
					randomW, randomH, thus, thusVideo, current, timer, duration, myVideoPlayer;

				videoPlacement();

				
				function videoPlacement (){
					$(".video").each(function(i){ 
						// arr.push($(this));
						randomMe($(this));
						var duration = $(this).parent().children('.duration');
						var myVideoPlayer = $(this).children('video').get(0);

						
						myVideoPlayer.addEventListener('loadedmetadata', function() {
						 	arr[i] = Math.floor(myVideoPlayer.duration);
						    $(duration).html(arr[i] + ".00 sec");
						});
				
					});
				}


				// Random placement of the videos
				function randomMe(el){
					randomW = Math.floor((Math.random() * wW / 1.5) + 0);
					randomH = Math.floor((Math.random() * wH / 1.5)+ 0);
					$(el).css({top: randomH, left: randomW});
				}


				// Rescale videos On resize
				$( window ).resize(function() {
					wW = $(window).width() - iW;
					wH = $(window).height() - iH;
					videoPlacement();
				});

				// Hide video when document is clicked
				$(document).on('click touchstart', function () {
					$('.project-item').removeClass('active');
					n = 0;
				    for(var i = 0 ; i < tab.length ; i++){
				    	tab[i].video[0].load();
				    	tab[i].video[0].pause();
				    	clearInterval(tab[i].timer);
				    }
				    $(".video").hide();
				});

				// Show video on Click
				$(".author, .title, .client, .duration").click(function(e){

					$(this).parent().addClass('active');

					thus = $(this).parent().children('.video');
					thusCurrent = $(this).parent().children('.current');
					thusDuration = $(this).parent().children('.duration');
					thusVideo = thus.children();

					tab[n] = new video(thus, thusCurrent, thusDuration, thusVideo);
					tab[n].display;
					tab[n].play;
					tab[n].timer;
					tab[n].index(more);
					n++;
					more += 10;

					e.stopPropagation(); // This is the preferred method.
					return false;        // This should not be used unless you do not want
		        });

				// Video object
		        function video(thus, thusCurrent, thusDuration , thusVideo){
		        	this.container = thus;
		        	this.spancurrent = thusCurrent;
		        	this.spanduration = thusDuration;
		        	this.video = thusVideo;
		        	this.display = this.container.show();
		        	this.play = this.video[0].play();
		        	this.index = function(more){
		        		this.container.css('position', 'fixed');
						this.container.css('z-index', more);
					};
		        	this.timer = setInterval(function(){
						current = $(thusVideo).get(0).currentTime;
						duration = $(thusVideo).get(0).duration;
						//$(thusDuration).html(Math.floor(duration - current)); 
						var num = duration - current;
						num = isNaN(num) ? '' : $(thusDuration).html(num.toFixed(2) + " sec");
						 
					},50);
		        }

			});