var App = {

	sideNav_setHeight : function () {
		var h = window.innerHeight;
		$("#side-nav").height(h)
		$topiclist = $(".topic_list")
		$topiclist.height(h - $topiclist.offset().top)
	},

	load_ranking : function () {
		$.getJSON("assets/json/channel-ranking.json", function (res) {
			//console.log(res)
			var wrap = $(".timeline-wrapper")
			for (var i=0, l=res.length; i<l; i++) {
				var tit = $("<h1>"+res[i].title+"</h1>");
				var desc = res[i].description.substring(0, 100);
				var content_inner = $('<div class="content-inner"><div class="desc">'+desc+'</div><div class="btn_wrap"><div class="sub_btns"><span class="pocket"><i class="fa fa-bookmark"></i></span></div><div class="socials"><i class="fa fa-twitter"></i><i class="fa fa-facebook"></i><i class="fa fa-facebook"></i></div></div></div>')
				var article = $("<article><a href='#'><figure></figure></a><div class='content'></div></article>");
				article.find("figure").css({"background-image":"url("+res[i].thumbnailUrl+")"}).closest("a").append(tit).next(".content").append(content_inner)
				wrap.append(article)
			}
		})
		/*$.getJSON("assets/json/highlight.json", function (res) {
			console.log(res)
		})*/
	},

	load_topic : function () {
		$wrap = $("#side-nav .topic_list")
		$.getJSON("assets/json/topic_data.json", function (res) {
			for (var i=0, l=res.length; i<l; i++) {
				var $dl = $("<dl/>")
				var dt = '<dt><a href="#"><i class="caret fa fa-caret-right"></i><i class="ifolder fa fa-folder-o"></i>'+res[i].label.ja+'<span>'+res[i].channels.length+'</span></a><label><input type="checkbox"></label></dt>'
				$dl.append(dt);
				var $ddul = $("<dd><ul></ul></dd>")
				for (var k=0, o=res[i].channels.length; k<o; k++) {
					var tp = res[i].channels[k];
					var li = '<li><a href="#">'+tp.label.displayText+'<span><i class="fa fa-sticky-note-o"></i>'+tp.numEntries+'</span><span><i class="fa fa-check-square-o"></i>'+tp.numFollowers+'</span></a><label><input type="checkbox"></label></li>';
					$ddul.find("ul").append(li)
				}
				$dl.append($ddul)
				$wrap.append($dl)
			}
		})
	},

	toggle_topic: function () {
		$("#side-nav .topic_list").on("click", "dt a", function (e) {
			e.preventDefault();
			var $dl = $(this).closest("dl");
			var caret_icon = $dl.find(".caret")[0];
			var folder_icon = $dl.find(".ifolder")[0];
			$dl.toggleClass("topic_open");
			if($dl.hasClass("topic_open")) {
				caret_icon.className = "caret fa fa-caret-down"
				folder_icon.className = "ifolder fa fa-folder-open-o"
			}else{
				caret_icon.className = "caret fa fa-caret-right"
				folder_icon.className = "ifolder fa fa-folder-o"
			}
		})
	},

	nav_drower : function () {
		//console.log($("#nav-drawer")[0])
		$("#nav-drawer").on("touchend", function () {
			$("body").addClass("nav-drawer-open")
		})
		$("#side-nav .close").on("touchend", function () {
			$("body").removeClass("nav-drawer-open")
		})
	}
}



















