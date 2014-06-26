//Carousel Master Control - Start
	$(function () {
		$("#myCarousel").carousel('pause'); //Stop carousel cycle		
		makeChart1();
		makeChart2();
		
		//Effect when click menu on navigator bar 
		$(".slide-one").click(function () {			
			$("#myCarousel").carousel(0);			
		});
		$(".slide-two").click(function () {			
			$("#myCarousel").carousel(1);
		});
		$(".slide-three").click(function () {			
			$("#myCarousel").carousel(2);	
		});
		
		//Effect with carousel left - right control & menu on navigator bar
		$('#myCarousel').on('slide.bs.carousel', function () {	//slide - Redraw all function below before move to prev/next page
			$("#myCarousel").carousel('pause'); //Stop cycle of carousel when slide.bs.carousel was started
			pre_load();
			makeChart1();
			makeChart2();
			makeChart5();
			makeChart6();
			//show4();
		});
	});	
// Carousel Master Control -End
	
// Start 1st Graph
	$(function() {		
		$("#country1, #country2").load("dataset/drop_down/country_w_val.html"); //Load main drop-down list
		//$("#country3, #country4").load("dataset/drop_down/country_w_val.html"); //Load optional drop-down list
		
		$("button.toggler").click(function () {	
			//Switch display drop-down list menu and dataset directory
			$( "span#title3" ).toggle();
		
			$me = $(this);
			//Switch toggle button display text
			$me.text(function (i, v) {
				return v === '% of value added' ? '2005 US Dollars' : '% of value added';
			});
			//Switch chart type to show in same reserved DIV area
			$me.toggleClass('off');
			if ($me.is(".off")) { //show 2005 US dollars graph
				$("#country3, #country4").load("dataset/drop_down/country_w_val.html"); //refresh drop-down list every time toggle button press 
				makeChart3();
				makeChart4();
			} else { //show % of value added graph
				$("#country1, #country2").load("dataset/drop_down/country_w_val.html"); //refresh drop-down list every time toggle button press	
				makeChart1();
				makeChart2();
			}
		});	
	});	
	
	//% of value added - control
	function GetSelectedItem1() {
		var e = document.getElementById("country1");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart1.load({
			url: 'dataset/value_added/sector/'+strSel+'.csv'
		});
		chart1.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}	
	function GetSelectedItem2() {
		var e = document.getElementById("country2");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart2.load({
			url: 'dataset/value_added/sector/'+strSel+'.csv'
		});
		chart2.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}
	
	//Million 2005 US dollars - control
	function GetSelectedItem3() {
		var e = document.getElementById("country3");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart1.load({
			url: 'dataset/value_added/dollar/'+strSel+'.csv'
		});
		chart1.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}	
	function GetSelectedItem4() {
		var e = document.getElementById("country4");
		var strSel = e.options[e.selectedIndex].value;
		var c2name = e.options[e.selectedIndex].text;
		chart2.load({
			url: 'dataset/value_added/dollar/'+strSel+'.csv'
		});
		chart2.data.names({sec1: 'Agriculture ('+c2name+')', sec2: 'Industry ('+c2name+')', sec3: 'Services ('+c2name+')'});
	}
	
	//% of value added - Top chart
	function makeChart1(){
		return chart1 = c3.generate({
			bindto: "#chart1",
			data: {
				x: 'year',
				x_format: '%Y',
				url: 'dataset/value_added/sector/Afghanistan.csv',
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
					label: {
						text: 'Value added',
						position: 'outer-middle'
					},
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
			},
			transition: {
				duration: 1000
			}
		});	
	}
	//% of value added - Bottom chart
	function makeChart2(){
		return chart2 = c3.generate({
			bindto: '#chart2',
			data: {
				x: 'year',
				x_format: '%Y',
				url: 'dataset/value_added/sector/Afghanistan.csv',
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
					label: {
						text: 'Value added',
						position: 'outer-middle'
					},
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
			},
			transition: {
				duration: 1000
			}
		});	
	}
	
	//Million 2005 US dollars - Top chart
	function makeChart3(){
		return chart1 = c3.generate({
			bindto: "#chart1",
			padding: {
				left: 90,
			},
			data: {
				x: 'year',
				x_format: '%Y',
				url: 'dataset/value_added/dollar/Afghanistan.csv',
				names: {
					sec1: 'Agriculture (Afghanistan)',
					sec2: 'Industry (Afghanistan)',
					sec3: 'Service (Afghanistan)'
				},
				type: 'area',
				groups: [
					['sec1', 'sec2', 'sec3']
				]
			},
			color: {
				pattern: ['#2ca02c', '#ff7f0e', '#1f77b4']
			},	
			axis: {
				y: {
					label: {
						text: 'Million 2005 US dollars',
						position: 'outer-middle'
					},
					tick: {
						format: d3.format(",")
					}
				},
				x: {
					type : 'timeseries',
					tick : {
						format : "%Y"
					}
				}
			},
			transition: {
				duration: 1000
			}
		});	
	}
	//Million 2005 US dollars - Bottom chart
	function makeChart4(){
		return chart2 = c3.generate({
			bindto: '#chart2',
			padding: {
				left: 90,
			},
			data: {
				x: 'year',
				x_format: '%Y',
				url: 'dataset/value_added/dollar/Afghanistan.csv',
				names: {
					sec1: 'Agriculture (Afghanistan)',
					sec2: 'Industry (Afghanistan)',
					sec3: 'Service (Afghanistan)'
				},
				type: 'area',
				groups: [
					['sec1', 'sec2', 'sec3']
				]
			},
			color: {
				pattern: ['#2ca02c', '#ff7f0e', '#1f77b4']
			},	
			axis: {
				y: {
					label: {
						text: 'Million 2005 US dollars',
						position: 'outer-middle'
					},
					tick: {
						format: d3.format(",")
					}
				},
				x: {
					type : 'timeseries',
					tick : {
						format : "%Y"
					}
				}
			},
			transition: {
				duration: 1000
			}
		});	
	}
// End 1st Graph


//Start 2nd Graph	
    $('#span1').mouseover(function () {
        draw1(); //Show unstacked graph
    });	
    $('#span2').mouseover(function () {
        draw2(); //Show stacked graph
    });
	
	//Switch display text & colour control
	$('.dataspan').removeClass("label label-warning");
	$('.dataspan:not(#span1)').addClass("label label-default");
	$('#span1').addClass("label label-warning");
	$('#title2').hide();
	$('#title1').show();
	$('#footer2').hide();
	$('#footer1').show();

	function makeChart5(){
		return chart3 = c3.generate({
			bindto: '#chart3',
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
							format : "%Y"
						},
					label: {
						text: 'Year',
						position: 'outer-right'
					}				
				}
			}
		});
	}
	
	function draw1() { 
 		chart3.load({
			url: 'dataset/stack_unstack/draw1_ts_re.csv', //load stacked data
		})
		chart3.groups([['data1', 'data2', 'data3', 'data4', 'data5']]);
		//Switch display text & colour control
		$('.dataspan').removeClass("label label-warning");
		$('.dataspan:not(#span1)').addClass("label label-default");
		$('#span1').addClass("label label-warning");
		$('#title2').hide();
		$('#title1').show();
		$('#footer2').hide();
		$('#footer1').show();
	}
	
	function draw2() { 
		chart3.load({
			url: 'dataset/stack_unstack/draw2_ts_re.csv', //load unstacked data
		})
		chart3.groups([['data1']]);	
		//Switch display text & colour control
		$('.dataspan').removeClass("label label-warning");
		$('.dataspan:not(#span2').addClass("label label-default");
		$('#span2').addClass("label label-warning");
		$('#title1').hide();
		$('#title2').show();
		$('#footer1').hide();
		$('#footer2').show();
	}
// End 2nd Graph


// Start 3rd Graph
	$(document).ready(function () {
		//Load data to drop-down list
		$("#n1,#n2,#n3").load("dataset/drop_down/country.html");
		
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
	
	function makeChart6(){
		return chart4 = c3.generate({
			bindto: '#chart4',
			padding: {
				right: 8,
			},
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
							culling: {
								max: 8
							}
						},
					label: {
						text: 'Year',
						position: 'outer-right'
					}				
				}
			}
		});
	}
// End 3rd Graph

function pre_load() {
	$("#country1, #country2").load("dataset/drop_down/country_w_val.html");
	$("#n1,#n2,#n3").load("dataset/drop_down/country.html");
}