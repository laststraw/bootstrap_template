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
			url: 'dataset/stack_unstack/draw1_ts_re.csv',
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
			url: 'dataset/stack_unstack/draw1_ts_re.csv',
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
			url: 'dataset/stack_unstack/draw2_ts_re.csv',
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
		$("#country1").load("dataset/drop_down/country_w_val_1.txt");
		$("#country2").load("dataset/drop_down/country_w_val_2.txt");
	});	
	
	function GetSelectedItem1() {
		var e = document.getElementById("country1");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart2.load({
			url: 'dataset/gdp_sector/'+strSel+'.csv'
		});
		chart2.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}
	
	function GetSelectedItem2() {
		var e = document.getElementById("country2");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart3.load({
			url: 'dataset/gdp_sector/'+strSel+'.csv'
		});
		chart3.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}
	
	var chart2 = c3.generate({
		bindto: '#chart2',
		data: {
			x: 'year',
			x_format: '%Y',
			url: 'dataset/gdp_sector/Afghanistan.csv',
			names: {
				sec1: 'Agriculture (Afghanistan)',
				sec2: 'Industry (Afghanistan)',
				sec3: 'Service (Afghanistan)'
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
			url: 'dataset/gdp_sector/Armenia.csv',
			names: {
				sec1: 'Agriculture (Armenia)',
				sec2: 'Industry (Armenia)',
				sec3: 'Service (Armenia)'
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
	$(document).ready(function () {
		//Load data to drop-down list
		$("#n1,#n2,#n3").load("dataset/drop_down/country.txt");
		
		$("#n1,#n2,#n3").change(function () {
			//Track change from drop-down list
			var c1 = $("#n1").find('option:selected').val();
			var c2 = $("#n2").find('option:selected').val();
			var c3 = $("#n3").find('option:selected').val();
			//Assign fixed colours to each drop-down list
			var myCols = {};
			myCols[c1] = d3.rgb('#2ca02c');
			myCols[c2] = d3.rgb('#ff7f0e');
			myCols[c3] = d3.rgb('#1f77b4');			
			//Hide all data then plot selected data from drop-down
			chart4.hide(null, {
				withLegend: true
			});
			chart4.data.colors(myCols);
			chart4.show([c1, c2, c3], {
				withLegend: true
			});			
		});
	});
		
	var chart4 = c3.generate({
		bindto: '#chart4',
		data: {
			x: 'year',
			x_format: '%Y',
			url: 'dataset/gdp_growth_rate.csv',
			hide: true
		},
		legend: {
			show: false
		},
		line: {
			connect_null: false
		},
		grid: {
			y: {
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
					},
				label: {
					text: 'Year',
					position: 'outer-right'
				}				
			}
		}
	});
// End 3rd Graph