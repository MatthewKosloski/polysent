(function(){

	'use strict';

	var body = $('body');

	var dropdownOpen = 'dropdown--open',
		dropdown = $('.dropdown'),
		dropdownUl = $('.dropdown ul'),
		dropdownUlVisible = 'dropdown__list--visible';

	var auxiliaryMenu = $('.auxiliary-mobile'),
		auxiliaryMenuOpen = 'auxiliary-mobile--open',
		auxiliarySortersVisible = 'auxiliary__sorters--visible';

	var mobile = ($(window).width() < 640);

	dropdown.click(function(){toggleDropdown($(this), dropdownOpen, dropdownUlVisible);});

	if(mobile) {
		auxiliaryMenu.click(function(){toggleDropdown($(this), auxiliaryMenuOpen, auxiliarySortersVisible);});
	}

	body.click(function(evt){clickAnywhereToHide(evt);});

	function toggleDropdown(arg, selfClass, listClass){
		var _self = $(arg),
			list = _self.children('ul');

		_self.toggleClass(selfClass);
		list.toggleClass(listClass);
	}

	function clickAnywhereToHide(e) {
		if($(e.target).closest(dropdown).length === 0) {
			dropdown.removeClass(dropdownOpen);
			dropdownUl.removeClass(dropdownUlVisible);
		}
	}

})();