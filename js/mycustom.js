$(document).ready(function(){
	setTimeout( function(){
		$( ".superbox-img" ).tooltip();
		$('.superbox-img:eq(1)').trigger('hover');
		},1000
	);
});
// JavaScript Document
$(document).ready(function(){
	$(document).on("click",".getInTouch",function(){
		window.location=base_url+'course/Detail/'+this.id;
	});

	$(document).on("click","#startexcercise",function(){
		var timeframe=$('#idexcercisetimeframe :selected').val();
        
         
	if(typeof(timeframe)=== undefined || timeframe=='') {	
            $('#erroridexcercisetimeframe').html('Please Select Time.').show();
            return;
			timeframe=1;
		}
		
		var img=$('.selected-audio').attr('rel');
		if(typeof(img)=='undefined' || img=='') {
			img='';
		}
		
		window.location=base_url+'exercise/startexercise/'+timeframe+'/'+img;
	});
	
	
	$(document).on("click","#startaudioexcercise",function(){
		
		var timeframe=$('.selected-audio').attr('data-time');
		if(typeof(timeframe)=='undefined' || timeframe=='') {
			timeframe=1;
		} 
		var img=$('.selected-audio').attr('rel');
		img= 'excercise-img';
		window.location=base_url+'exercise/startexercise/'+timeframe+'/'+img+'/guided';
	});

	$(document).on("click",".uploadfrom",function(){
		if(this.value=='fromcomputer') {
			$("#uploadfromcomputer").show();
			$("#embeddedmedia").hide();
			$("#IdEmbedCode").val("");
			$("#IdUploadType").val("fromcomputer");
 		} else {
			$("#uploadfromcomputer").hide();
			$("#embeddedmedia").show();
			$("#id_course_media").val("");
			$("#id_img_course_media").attr("src","");
			$("#IdUploadType").val("embed");
		}
	});

	$(document).on("click",".AddMedia",function(){
		$(".close").trigger("click");
	});
});
/*Function for Library Tab Active*/
function setGroupTab(tabIndex) {
	var allLinks=$('.secondary-nav li');
	allLinks.removeClass('active');
	$(allLinks[tabIndex-1]).addClass('active');
    
}

function OpenLectureForm(sectionid)
{
	//$('.add-lecture-wrap').slideToggle();
	$('.add-lecture-wrap').show();
	$("html, body").animate({scrollTop:$('.add-lecture-wrap').position().top});
	$('.seach-add-section').slideUp();
	$("#IdSelectedSectionId").val(sectionid);
}

function OpenSectionForm()
{
	$('.seach-add-section').slideToggle().scrollTop(0);
	$("html, body").animate({ scrollTop : $('.seach-add-section').position().top});
	$('.add-lecture-wrap').slideUp();
}

function RedirectTo(coursid)
{
	window.location=base_url+'course/Detail/'+coursid;
}

function EditCourse()
{
	coursid=$("#CourseUniqueID").val();
	window.location=base_url+'course/UpdateCourse/'+coursid;
}

function changeLanguage(lang){
	$.post(base_url+'ajax/changeLanguage',{lang:lang},function(){
		window.location.reload();
	});
}

$(document).ready(function(){
	$('.notification-contens').hide();
		$('#slideNotifyr').click(function(e) {
			$('.notification-contens').slideToggle();
		});

	$(document).click(function(e) {
		  var target = e.target;
		  if (!$(target).is('#slideNotifyr') && !$(target).parents().is('.notification-contens')) {
			$('.notification-contens').slideUp();
		  }
	});
	$('.notification-contens ul li').click(function() {
		$('.notification-contens').slideUp();
	});  
			
	$('#user-options').click(function() {
		$('.notification-contens').slideUp();
	});  
});