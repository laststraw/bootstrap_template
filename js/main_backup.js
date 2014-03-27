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



    var d3parentjs = $('#d3parent').width();

    var margin = { top: 20, right: 20, bottom: 30, left: 60 },
			width = d3parentjs - margin.left - margin.right,
			height = Math.max(winparams.height - tosubtract, minparams.height) - margin.top - margin.bottom;

    $('.tempgraph').css("width", width + margin.left + margin.right);
    $('.tempgraph').css("height", height + margin.top + margin.bottom);

    var x0 = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
			.range([height, 0]);

    var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
			.scale(x0)
			.orient("bottom");

    var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.tickFormat(d3.format(".2s"));

    var svg = d3.select("#divd3_1").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		    .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("bar.csv", function (error, data) {
        var ageNames = d3.keys(data[0]).filter(function (key) { return key !== "State"; });

        data.forEach(function (d) {
            d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
        });

        x0.domain(data.map(function (d) { return d.State; }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

        svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis);

        svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			  .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Population");

        var state = svg.selectAll(".state")
			  .data(data)
			  .enter().append("g")
			  .attr("class", "g")
			  .attr("transform", function (d) { return "translate(" + x0(d.State) + ",0)"; });

        state.selectAll("rect")
			  .data(function (d) { return d.ages; })
			  .enter().append("rect")
			  .attr("width", x1.rangeBand())
			  .attr("x", function (d) { return x1(d.name); })
			  .attr("y", function (d) { return y(d.value); })
			  .attr("height", function (d) { return height - y(d.value); })
			  .style("fill", function (d) { return color(d.name); });

        var legend = svg.selectAll(".legend")
			  .data(ageNames.slice().reverse())
			  .enter().append("g")
			  .attr("class", "legend")
			  .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
			  .attr("x", width - 18)
			  .attr("width", 18)
			  .attr("height", 18)
			  .style("fill", color);

        legend.append("text")
			  .attr("x", width - 24)
			  .attr("y", 9)
			  .attr("dy", ".35em")
			  .style("text-anchor", "end")
			  .text(function (d) { return d; });

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


//Start C3 chart	
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
			url: '/bootstrap_template/draw1_ts_re.csv',
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
	
	function draw1() {
 		chart.load({
			url: '/bootstrap_template/draw1_ts_re.csv',
		})
		chart.groups([['data1', 'data2', 'data3', 'data4', 'data5']]);
	
	$('.dataspan').removeClass("label label-warning");
	$('.dataspan:not(#span1)').addClass("label label-default");
	$('#span1').addClass("label label-warning");
	$('#title2').hide();
	$('#title1').show();
	$('#footer2').hide();
	$('#footer1').show();
	
	}

function draw2() {
    chart.load({
			url: '/bootstrap_template/draw2_ts_re.csv',
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
// End C3 chart