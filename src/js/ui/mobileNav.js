(function(){

	'use strict';

	var body = $('body');

	var hamburger = $('.hamburger'),
		hamburgerOpen = 'hamburger--open',
		mobileNav = $('.mobile-nav'),
		globe = $('.globe');

	var mobileNavExpand = 'mobile-nav--expand',
		globeContract = 'globe--contract';

	var menuClones = $('.nav li').clone();
	
	menuClones.appendTo('.mobile-nav ul');

	body.click(function(evt){clickAnywhereToHide(evt);});

	hamburger.click(function(){toggleMobileNav($(this));});

	function toggleMobileNav(arg){
		$(arg).toggleClass(hamburgerOpen);
		globe.toggleClass(globeContract);
		mobileNav.toggleClass(mobileNavExpand);
	}

	function clickAnywhereToHide(e) {
		if($(e.target).closest(hamburger).length === 0 && mobileNav.hasClass(mobileNavExpand)) {
			toggleMobileNav(hamburger);
		}
	}

})();