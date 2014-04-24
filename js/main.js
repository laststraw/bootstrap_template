$(document).ready(function () {

    var winparams = { width: $(window).width(), height: $(window).height() };
    var tosubtract = $('#ournav').height() + parseInt($('#ournav').css('marginBottom')) + parseInt($('#ournav').css('borderBottomWidth'))
        + $('#h1val').height() + parseInt($('#h2val').css('marginTop')) + $('#h2val').height() + parseInt($('#h2val').css('marginBottom'))
        + $('#pval').height() + parseInt($('#pval').css('marginBottom'));
    var minparams = { width: 500, height: 300 };


    var chartdrawn = 1;

    // Cache selectors
    var lastId,
    topMenu = $("#scrolltarget"),
    topMenuHeight = -15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });



    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    // Add mouseover to change graph here
    $('#span1').mouseover(function () {
        draw1();

    });

    $('#span2').mouseover(function () {
        draw2();
    });
	
    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
         .parent().removeClass("active .mybackground")
         .end().filter("[href=#" + id + "]").parent().addClass("active .mybackground");
        }
    });

});

var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
(function (d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = '//www.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g, s)
} (document, 'script'));


//Start 1st Graph
	$('.dataspan').removeClass("label label-warning");
	$('.dataspan:not(#span1)').addClass("label label-default");
	$('#span1').addClass("label label-warning");
	$('#title2').hide();
	$('#title1').show();
	$('#footer2').hide();
	$('#footer1').show();

	var chart = c3.generate({
		data: {
			x: 'year',
			x_format: '%Y%m%d',
			url: '/bootstrap_template/stack_unstack/draw1_ts_re.csv',
			names: {
				data1: 'East and North-East Asia',
				data2: 'North and Central Asia',
				data3: 'Pacific',
				data4: 'South and South-West Asia',
				data5: 'South-East Asia'
			},
			type: 'bar',
			groups: [
				['data1', 'data2', 'data3', 'data4', 'data5']
			]
		},
		
		regions: [{start:'20120701', class:'foo'}],
		
		grid: {
			y: {
				lines: [{value:0}],
				show: true
			}
		},

		axis: {
			y: {
				label: {
					text: 'GDP Growth',
					position: 'outer-middle'
				}
			},
			x: {
					type : 'timeseries',
					tick : {
						format : "%Y",
						culling: false
					},
				label: {
					text: 'Year',
					position: 'outer-right'
				}				
			}
		}
	});
	
	function draw1() {
 		chart.load({
			url: '/bootstrap_template/stack_unstack/draw1_ts_re.csv',
		})
		chart.groups([['data1', 'data2', 'data3', 'data4', 'data5']]);
		$('.dataspan').removeClass("label label-warning");
		$('.dataspan:not(#span1)').addClass("label label-default");
		$('#span1').addClass("label label-warning");
		$('#title2').hide();
		$('#title1').show();
		$('#footer2').hide();
		$('#footer1').show();
	};
	
	function draw2() {
		chart.load({
			url: '/bootstrap_template/stack_unstack/draw2_ts_re.csv',
		})
		chart.groups([['data1']]);	
		$('.dataspan').removeClass("label label-warning");
		$('.dataspan:not(#span2').addClass("label label-default");
		$('#span2').addClass("label label-warning");
		$('#title1').hide();
		$('#title2').show();
		$('#footer1').hide();
		$('#footer2').show();
	};
// End 1st Graph


// Start 2nd Graph
	$(function() {		
		$("#country1, #country2").load("/bootstrap_template/country_w_val.txt");		
	});	
	
	function GetSelectedItem1() {
		var e = document.getElementById("country1");
		var strSel = e.options[e.selectedIndex].value;
		chart2.load({
			url: '/bootstrap_template/gdp_by_sector/'+strSel+'.csv'
		});
	}
	
	function GetSelectedItem2() {
		var e = document.getElementById("country2");
		var strSel = e.options[e.selectedIndex].value;
		chart3.load({
			url: '/bootstrap_template/gdp_by_sector/'+strSel+'.csv'
		});
	}
	
	var chart2 = c3.generate({
		bindto: '#chart2',
		data: {
			x: 'year',
			x_format: '%Y',
			url: '/bootstrap_template/gdp_by_sector/Afghanistan.csv',
			names: {
				sec1: 'Agriculture',
				sec2: 'Industry',
				sec3: 'Services'
			},
			type: 'bar',
			groups: [
				['sec1', 'sec2', 'sec3']
			]
		},
		bar: {
			width: {
				ratio: 0.9
			}
		},
		color: {
			pattern: ['#2ca02c', '#ff7f0e', '#1f77b4']
		},	
		axis: {
			y: {
				tick: {
					format: d3.format("%")
				}
			},
			x: {
				type : 'timeseries',
				tick : {
					format : "%Y"
				}
			}
		}
	});	
	
	var chart3 = c3.generate({
		bindto: '#chart3',
		data: {
			x: 'year',
			x_format: '%Y',
			url: '/bootstrap_template/gdp_by_sector/Afghanistan.csv',
			names: {
				sec1: 'Agriculture',
				sec2: 'Industry',
				sec3: 'Service'
			},
			type: 'bar',
			groups: [
				['sec1', 'sec2', 'sec3']
			]
		},
		bar: {
			width: {
				ratio: 0.9
			}
		},
		color: {
			pattern: ['#2ca02c', '#ff7f0e', '#1f77b4']
		},	
		axis: {
			y: {
				tick: {
					format: d3.format("%")
				}
			},
			x: {
				type : 'timeseries',
				tick : {
					format : "%Y"
				}
			}
		}
	});	
// End 2nd Graph

// Start 3rd Graph
	(function() {
		$("#n1,#n2,#n3").load("/bootstrap_template/country.txt");
		
		var prev1, prev2, prev3;		
		$("#n1,#n2,#n3").focus(function() {
			prev1 = $(this).val();
			prev2 = $(this).val();
			prev3 = $(this).val();
		}).change(function() {
			var c1 = $("#n1").find('option:selected').text();
			var c2 = $("#n2").find('option:selected').text();
			var c3 = $("#n3").find('option:selected').text();
			chart4.toggle([prev1,prev2,prev3]);
			chart4.sd([c1,c2,c3]);
			prev1 = $(this).val();
			prev2 = $(this).val();
			prev3 = $(this).val();
		});
	})();
		
	var chart4 = c3.generate({
		bindto: '#chart4',
		data: {
			x: 'year',
			x_format: '%Y',
			url: '/bootstrap_template/gdp_growth_rate.csv',
		},
		legend: {
			show: false
		},
		line: {
			connect_null: false
		},
		grid: {
			y: {
				lines: [{value:0}],
				show: true
			}
		},
		axis: {
			y: {
				label: {
					text: '% change per annum',
					position: 'outer-middle'
				}
			},
			x: {
					type : 'timeseries',
					tick : {
						format : "%Y",
						culling: {
							max: 6
						}
					},
				label: {
					text: 'Year',
					position: 'outer-right'
				}				
			}
		}
	});
	
	setTimeout(function() {		
		chart4.toggle();
	}, 500);
// End 3rd Graph