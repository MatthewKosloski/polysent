(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('FaqCtrl', ['$scope', '$sce', function($scope, $sce){
			$scope.renderHtml = function(html) {
            	return $sce.trustAsHtml(html);
       		};
			$scope.faqs = [
				{
					question: 'What is Polysent?',
					answer: 'Polysent is an online poll maker that allows you to instantly obtain anonymously-submitted results with ease.'
				},
				{
					question: 'How many polls can I submit?',
					answer: 'You can submit as many polls as you desire; however, all submissions are subject to review.'
				},
				{
					question: 'Can I submit a similar poll that already exists?',
					answer: 'Yes, feel free to submit a poll that has already been added to Polysent.'
				},
				{
					question: 'Can I create a private poll?',
					answer: 'Yes, you don\'t have to create a public poll that will be added and archieved on the site for everyone to see.  If you desire to create a private poll, just select "Private" on the form when submitting.'
				},
				{
					question: 'I found a bug, how do I contact you?',
					answer: 'If you discover problems during your experience, feel free to create an issue on the Github <a href="#">repository</a>, send me an <a href="mailto:hi@mtk.me">email</a>, or <a href="http://twitter.com/_mkos">tweet</a> me.'
				},

			];
		}]);
})();