$(document).ready(function(){
	angular.bootstrap(document, ['App']);
});
var app = angular.module('App' , ['ui.bootstrap', 'localytics.directives']);
/*	Controller(s)
===================================*/
/**** Course Controller ***/
app.controller('CoursePageCtrl',function($scope,CourseService){
	$scope.listData = [];
	$scope.registeredCourse=function(){
	$scope.SearchKeyword=''; 
	if($('#SearchKeyword').val()){ $scope.SearchKeyword=$('#SearchKeyword').val(); }
	$scope.Status='' ; 
	if($('#IdCourseType').val()){ $scope.Status=$('#IdCourseType').val(); }
	CoursePublishStatus=$("#IdCoursePublishStatus").val();
	var reqData={pageno:1,search_string:$scope.SearchKeyword,PaymentStatus:$scope.Status,CoursePublishStatus:CoursePublishStatus}
	CourseService.get_CourseList(reqData).then(function(response){
		if(response.ResponseCode==200)
		{
			$("#NoCourseMessageCon").hide();
			console.log(response);
			
			$scope.noOfObj = response['Data']['TotalRecords']; 
			$('#hdnQuery').val(response['Data']['query']);
			//If no of records > 0 then show
			$('#grpContainer').show();
			$('#CoursePageCtrl').show();
			$('#grpHasNoResult').hide();
			//If no of records == 0 then hide
			if($scope.noOfObj == 0)
			{
				$('#grpContainer').hide();
				$('#CoursePageCtrl').hide();
				$('#grpHasNoResult').css('display','block');
			}
			$scope.listData=[];
			$scope.listData.push({ObjCourses:response.Data.Records});  
			$('#hdnQuery').val(response.last_query);
		}
		else
		{
			$("#NoCourseMessage").text(response.Message);
			$("#NoCourseMessageCon").show();
			$("#CoursePageCtrl").hide();
		}
	}), function(error){
	}
	}
	
	$scope.CreateCourseC=function()
{
	var Title=$scope.Title;
	var Description=$scope.Description;
	var LoginSessionKey=$scope.LoginSessionKey;
	var CourseUniqueID=$scope.CourseUniqueID;
	var CoursePrice=$scope.CoursePrice;
	var Discount=$scope.Discount;
	var CourseCouponCode=$("#CourseCouponCode").val();
	var TargetAudience=$scope.TargetAudience;
	var GetFromThisCourse=$scope.GetFromThisCourse;
	var CourseRequirment=$scope.CourseRequirment;
	
	if($("#id_course_media").val()!='' && typeof($("#id_course_media").val())!='undefined') {
		var CourseImage=$("#id_course_media").val();
	} else if($("#imageatualpath").val()!='' && typeof($("#imageatualpath").val())!='undefined') {
		var CourseImage=$("#imageatualpath").val();
	} else {
		var CourseImage='';
	}
	var CourseFeesType=$('input:radio[name="CourseFeesType"]:checked').val();

var requestData = {Title:Title,Description:Description,LoginSessionKey:LoginSessionKey,CoursePrice:CoursePrice,Discount:Discount,CourseCouponCode:CourseCouponCode,TargetAudience:TargetAudience,GetFromThisCourse:GetFromThisCourse,CourseRequirment:CourseRequirment,CourseUniqueID:CourseUniqueID,CourseFeesType:CourseFeesType,CourseImage:CourseImage};

CourseService.CreateCourse(requestData).then(function(response)
{ 
		if(response.ResponseCode==200) {
			if(CourseUniqueID!='') {
				alertify.success(response.Message);
			} else {
				window.location.href=base_url+'course/CourseLecture/'+response.Data.CourseGUID;
			}
			/*alertify.success(response.Message);*/
			/*blankFields('all','all');*/
		} else if(response.ResponseCode==670 || response.ResponseCode==535) {
			blankFields('ErrorTitle',response.Message);
		} else if(response.ResponseCode==671) {
			blankFields('ErrorDescription',response.Message);
		} else if(response.ResponseCode==781) {
			blankFields('ErrorCoursePrice',response.Message);
		} else if(response.ResponseCode==690) {
			blankFields('ErrorCourseType',response.Message);
		} else {
		}
	})
};

$scope.CourseDetail=function()
{
	$scope.discounts=[{"dvalue":"10","dlabel":"10"},{"dvalue":"20","dlabel":"20"},{"dvalue":"30","dlabel":"30"}];

	var LoginSessionKey=$("#LoginSessionKey").val();
	var CourseUniqueID=$("#CourseUniqueID").val();
	if(CourseUniqueID!='')
	{
		$("#IdGenereateCode").hide();
		$("#ResetLink").hide();
		$("#CreateCourseBtn").text('UPDATE COURSE');
		var requestData={LoginSessionKey:LoginSessionKey,CourseUniqueID:CourseUniqueID};
		CourseService.GetCourseDetails(requestData).then(function(response)
		{
			if(response.ResponseCode==200)
			{
				CourseDeta=response.Data.CourseDetails;
				$scope.Title=CourseDeta.Title;
				$scope.Description=CourseDeta.Description;
				$scope.CoursePrice=CourseDeta.CoursePrice;
				$scope.Discount=CourseDeta.Discount;
				$scope.CourseCouponCode=CourseDeta.CourseCouponCode;
				$scope.CourseRequirment=CourseDeta.CourseRequirment;
				$scope.GetFromThisCourse=CourseDeta.GetFromThisCourse;
				$scope.TargetAudience=CourseDeta.TargetAudience;
				if(CourseDeta.CoursePrice<1 || CourseDeta.CoursePrice=='') {
					$('input:radio[id="openGroup"]').attr('checked',true);
				} else {
					$('input:radio[id="closeGroup"]').attr('checked',true);
				}
				$("#Discount").val(CourseDeta.Discount);
				$scope.image=CourseDeta.imagepath;
				$scope.imagepath=CourseDeta.CourseImage;
				if($scope.imagepath=='')
				{
					$('#group_photo').css('display','none');
					$('#add_group_photo').css('display','show');
				}
				else
				{
					if(response.Data.CourseImage!=site_url+'assets/img/profiles/default-148.png')
					{
						$('#add_group_photo').show();
					}
					else
					{
						$('#group_photo').hide();
						$('.del-ico').hide();
						$('#add_group_photo').show();
					}
				}
			}
			jQuery.each($scope.discounts,function(discindex,discvalue){
				if(discvalue.dvalue==CourseDeta.Discount) {
					$scope.discountlist=$scope.discounts[discindex];
				}
			});
		})
	}
};

	$scope.CourseBillingAddress=function () 
	{
		var address=$scope.address;
		var city=$scope.city;
		var country=$scope.country;
		var bankaccount=$scope.bankaccount;
		var LoginSessionKey=$scope.LoginSessionKey;
		var requestData = {Address:address,City:city,Country:country,Bankaccount:bankaccount,LoginSessionKey:LoginSessionKey};
		CourseService.CreateCourseBillingAddress(requestData).then(function(response){ 
		})
	};

	 
	$scope.GetCourseLectures=function() 
	{
		var LoginSessionKey=$("#LoginSessionKey").val();
		var CourseUniqueID=$("#CourseUniqueID").val();
		var requestData={CourseUniqueID:CourseUniqueID,LoginSessionKey:LoginSessionKey};
		CourseService.GetCourseLecturesService(requestData).then(function(response){ 
			if(response.ResponseCode==200)
			{
				CourseData=response.Data.CourseDetails;
				$scope.CourseTitle=CourseData.Title;
				$scope.ReviewCount=CourseData.ReviewCount;
				$scope.StudentsCount=CourseData.Students;
				$scope.SessionCount=CourseData.Sessions;
				$scope.CourseDescription=CourseData.Description;
				$scope.DiscountCode=CourseData.CourseCouponCode;

				$scope.CourseRequirement=CourseData.CourseRequirment;
				$scope.GoingToGet=CourseData.GetFromThisCourse;
				$scope.TargetAudience=CourseData.TargetAudience;

				$scope.image=CourseData.imagepath;
				$scope.imagepath=CourseData.CourseImage;
				if($scope.imagepath=='')
				{
					$('#group_photo').css('display','none');
					$('#add_group_photo').css('display','show');
				}
				else
				{
					if(response.Data.CourseImage!=site_url+'assets/img/profiles/default-148.png')
					{
						$('#add_group_photo').show();
					}
					else
					{
						$('#group_photo').hide();
						$('.del-ico').hide();
						$('#add_group_photo').show();
					}
				}
				 var items = response.Data.Section; 
				         
                   try{
               
                for (var i = 0; i < items.length; i++) {                     
                   $scope.listData.push(items[i]) ;
                }
             
                
                }catch(e){
               
            } 
			}
		})
	};

	$scope.CreateCourseSection=function() 
	{
		var LoginSessionKey=$("#LoginSessionKey").val();
		var CourseUniqueID=$("#CourseUniqueID").val();
		var IdCourseSection=$("#IdCourseSection").val();
		var requestData={CourseUniqueID:CourseUniqueID,LoginSessionKey:LoginSessionKey,Title:IdCourseSection};
		CourseService.CreateCourseSectionService(requestData).then(function(response){
			if(response.ResponseCode==200) {
				$scope.listData.push(response.Data.section);

				$("#IdCourseSection").val('');
			} else {
				$("#ErrorCreateSection").text(response.Message);
			}
		})
	};
	
	$scope.CreateSectionLecture=function() 
	{
		var LoginSessionKey=$("#LoginSessionKey").val();
		var CourseUniqueID=$("#CourseUniqueID").val();
		var LectureTitle=$("#IdLectureTitle").val();
		var LectureType=$("#IdLectureType").val();
		var SectionID=$("#IdSelectedSectionId").val();
		var EmbedCode=$("#IdEmbedCode").val();
		var CourseMedia=$("#id_course_media").val();
		var UploadType=$("#IdUploadType").val();
		
		var requestData={CourseUniqueID:CourseUniqueID,LoginSessionKey:LoginSessionKey,LectureTitle:LectureTitle,SectionID:SectionID,EmbedCode:EmbedCode,UploadType:UploadType,CourseMedia:CourseMedia,MediaType:LectureType};
		CourseService.CreateLectureService(requestData).then(function(response){
			if(response.ResponseCode==200) {
				$scope.listData = [];
				angular.element(document.getElementById('CourseLectureCtrl')).scope().GetCourseLectures();
				$("#IdLectureTitle").val('');
			} else if(response.ResponseCode==785 || response.ResponseCode==747) {
				$("#IdLectureTitleError").text(response.Message);
			}
		})
	};
	
	$scope.GetCourseReviews=function() 
	{
		var LoginSessionKey=$("#LoginSessionKey").val();
		var CourseUniqueID=$("#CourseUniqueID").val();
		var requestData={CourseUniqueID:CourseUniqueID,LoginSessionKey:LoginSessionKey};
		CourseService.GetCourseReviewService(requestData).then(function(response)
		{ 
			if(response.ResponseCode==200)
			{
				$scope.ReviewList=[];
				$scope.ReviewList.push({ObjReviews:response.Data.Reviews}); 
			}
		})
	};
	
	$scope.GetLectureMediaType=function() 
	{
		var LoginSessionKey=$("#LoginSessionKey").val();
		var CourseUniqueID=$("#CourseUniqueID").val();
		var requestData={CourseUniqueID:CourseUniqueID,LoginSessionKey:LoginSessionKey};
		CourseService.GetLectureMediaType(requestData).then(function(response)
		{ 
			if(response.ResponseCode==200)
			{
				$scope.lecturetypes=response.Data;
			}
		})
	};

})

function blankFields(targetid,textmessage)
{
	$("#ErrorTitle").text('');
	$("#ErrorDescription").text('');
	$("#ErrorCoursePrice").text('');
	$("#ErrorCourseType").text('');
	if(targetid!='all') {
		$("#"+targetid).text(textmessage);
	}
}

$(document).ready(function(){
	$('#searchlist').click(function(){
	  angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
	});
	
	$(document).on("keypress","#SearchKeyword",function(e){
		if(e.which==13) {
			angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
		}
	});
	
	$('#IdCourseType').change(function(){
		angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
	});
	
	$(document).on("click","#PublishedCourse",function(){
		$("#IdCoursePublishStatus").val("1");
		angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
	});

	$(document).on("click","#DraftCourse",function(){
		$("#IdCoursePublishStatus").val("0");
		angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
	});
	
	$(document).on("click","#AllCourse",function(){
		$("#IdCoursePublishStatus").val("");
		angular.element(document.getElementById('CoursePageCtrl')).scope().registeredCourse();
	});

	$(document).on("click","#CreateCourseBtn",function(){
		angular.element(document.getElementById('CreateCourseCtrl')).scope().CreateCourseC();
	});
	
	$('#searchtext').click(function(){
		angular.element(document.getElementById('GroupMemberCtrl')).scope().showMember();						
	});	
	
	$(document).on("click","#SaveBillingAddress",function(){
		angular.element(document.getElementById('BillingAddressCtrl')).scope().CourseBillingAddress();
	});
	
	$(document).on("click","#CreateSection",function(){
		angular.element(document.getElementById('CourseLectureCtrl')).scope().CreateCourseSection();
	});

	$(document).on("keypress","#IdCourseSection",function(e){
		if(e.which==13) {
		angular.element(document.getElementById('CourseLectureCtrl')).scope().CreateCourseSection();
		}
	});

	$(document).on("click","#CreateLecture",function(){
		angular.element(document.getElementById('CourseLectureCtrl')).scope().CreateSectionLecture();
	});

	$(document).on("click","#ResetLink",function(){
		$("#CourseCouponCode").val('');
	});

	$(document).on("click","#IdGenereateCode",function(){
   pdata='action=getuniqid';
	$.ajax({
		url:base_url+'api_course/GetUniqId',
		type: "POST",
		data:pdata,
		success:function(data){
			$("#CourseCouponCode").text(data);
		}
	});		
	});
});


function removeThisMedia(ths){
 $(this).parent().html('');
 $('#add_group_photo').css('display','block');
}

$(function() {
	var errorHandler = function(event, id, fileName, reason) {
};

var c=0;var cc=0;
new qq.FineUploaderBasic({
multiple: false,
autoUpload: true,
button: $("#add_group_photo")[0],
request: {
endpoint: site_url+"uploadimage/uploadFile",
params: {
type: 'course',
unique_id:function() {
return $('#unique_id').val(); 
}
}
},

validation: {
allowedExtensions: ['jpeg', 'jpg', 'gif', 'png','JPEG', 'JPG', 'GIF', 'PNG'],
sizeLimit: 4194304 // 4mb
},
callbacks: {
onError: errorHandler,
onUpload: function(id, fileName) {
$('#loader').show();
//$("#wall_share_thought").attr("disabled", "disabled");
// alert('success');
},
onProgress: function(id, fileName, loaded, total) {
c = parseInt($('#image_counter').val());
c = c+1;
$('#image_counter').val(c);
},onComplete: function(id, fileName, responseJSON) {
if (responseJSON.result=='success') {
$('#group_photo').html('<img id="id_img_course_media" width="118" src="'+responseJSON.thumb+'"><input type="hidden" name="course_media" id="id_course_media" value="'+responseJSON.file_name+'"/><i class="del-ico" onclick="removeThisMedia(this);">remove</i>');
}
$('#group_photo').show();
$('#loader').hide();
$('#add_group_photo').css('display','none');
},onValidate: function (b) {
var validExtensions = ['jpeg', 'jpg', 'gif', 'png','JPEG', 'JPG', 'GIF', 'PNG']; //array of valid extensions
var fileName = b.name;
var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
if ($.inArray(fileNameExt, validExtensions) == -1){
alertify.alert("Allowed file type only jpeg,jpg,gif and png .");       
$(".alertify-message").css('padding-bottom','10px');
$(".alertify-buttons").css('float','none');
return false;
}
if(b.size>4194304){
alertify.alert('Files must be less than 4 MB.');
$(".alertify-message").css('padding-bottom','10px');
$(".alertify-buttons").css('float','none');
}
}
}
});
});