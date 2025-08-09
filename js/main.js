// Check for constant screen sizes ( > threshold --> remind users ) 
window.onresize = window.onload = function()
{
	var w = this.innerWidth;
	var h = this.innerHeight;
	let notifyScreen = document.getElementById("notify-page");
	let notifyMsg = document.getElementById("notify-msg");
	let notifyContainer = document.getElementById("notify-container");

	if (w < 840 || h < 600 || window.screen.width < 1024)
	{
		notifyScreen.style.display = "none";
		notifyMsg.style.display = "block";
		notifyMsg.innerHTML = "<h2>Hi! Please view this portfolio on a desktop for the best experience. Thank you :)</h2>";

		// Set Style
		notifyContainer.style.minHeight = "100dvh";
	}
	else
	{
		notifyScreen.style.display = "block";
		notifyMsg.style.display = "none";

		// Re-set Style
		notifyContainer.style.minHeight = "0";
	}
}


// Simple prevention of inspection code from public
document.addEventListener("keydown", function(event){
	if (event.ctrlKey){
		event.preventDefault();
	}

	if (event.keyCode == 123) {
		event.preventDefault();
	}
})

document.addEventListener('contextmenu', 
	event => event.preventDefault()
);

// Carousel functionality
let index=1;

function nextSlide(x)
{
	showSlide(index += x);
}

function showSlide(x)
{
	let numSlides = document.getElementsByClassName("carousel_slide");

	if (x > numSlides.length)
	{
		index = 1;
	}
	if (x < 1)
	{
		index = numSlides.length;
	}
	for (let i=0; i < numSlides.length; i++)
	{
		numSlides[i].style.display = "none";  // make it disappear
	}
	numSlides[index-1].style.display = "block";  // make it appear

}


;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());