function main() {
    init_upload();
    calendar();
    bankai();
}

function init_upload() {
    var inputElement = document.getElementById("input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
        var fileList = this.files; /* now you can work with the file list */
        var edge_file;
        var node_file;
        var first_file = fileList[0];
        var second_file = fileList[1];
        if (first_file.name === 'EDGE.csv') {
            edge_file = first_file;
            node_file = second_file;
        } else {
            edge_file = second_file;
            node_file = first_file;
        }
        var edge_reader = new FileReader();
        edge_reader.readAsText(edge_file);
        edge_reader.onload = function() {
            var edges = edge(edge_reader.result);
            var node_reader = new FileReader();
            node_reader.readAsText(node_file);
            node_reader.onload = function() {
                var nodes = node(node_reader.result);
                init_map(nodes, edges);
            };
        };
    }
}

function init_map(nodes, edges) {
    var map = L.map('map').setView([40, 260], 4);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    // ===================================================================================================
    function onEachNode(feature, layer) {
        if (feature.properties && feature.properties.out_num) {
            layer.bindPopup(feature.properties.LABEL);
        }
    }
    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    L.geoJson(nodes, {
        onEachFeature: onEachNode,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function(feature) {
            var num = parseFloat(feature.properties.out_num);
            if (num > 3000) {
                return {fillColor: "#FF0000"};
            } else if (num > 2000) {
                return {fillColor: "#F88017"};
            } else if (num > 1000) {
                return {fillColor: "#FFFF00"};
            } else if (num > 500) {
                return {fillColor: "#CCFB5D"};
            }
            return {fillColor: "#00FF00"};
        }
    }).addTo(map);
    // ===================================================================================================
    function onEachEdge(feature, layer) {
        if (feature.properties && feature.properties.COUNT) {
            var count = feature.properties.COUNT;
            var origin = feature.properties.ORIGIN_ID;
            var destination = feature.properties.DESTINATION_ID;
            layer.bindPopup("There are " + count + " delayed flights from " + origin + " to " + destination);
        }
    }
    L.geoJson(edges, {
        onEachFeature: onEachEdge,
        style: function(feature) {
            var num = parseFloat(feature.properties.COUNT);
            alert(num);
            if (num > 200) {
                return {
                    "color": "#FF0000",
                    "weight": 2,
                    "opacity": 0.65
                };
            } else if (num > 150) {
                return {
                    "color": "#F88017",
                    "weight": 1,
                    "opacity": 0.65
                };
            } else if (num > 100) {
                return {
                    "color": "#FFFF00",
                    "weight": 0.5,
                    "opacity": 0.65
                };
            } else if (num > 50) {
                return {
                    "color": "#CCFB5D",
                    "weight": 0.2,
                    "opacity": 0.65
                };
            }
            return {
                "color": "#00FF00",
                "weight": 0.1,
                "opacity": 0.65
            };
        }
    }).addTo(map);
}

function init_nodes(geojsonFeature) {
    var map = L.map('map').setView([40, 260], 4);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    function onEachNode(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.out_num) {
            layer.bindPopup(feature.properties.LABEL);
        }
    }
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    L.geoJson(geojsonFeature, {
        onEachFeature: onEachNode,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function(feature) {
            var num = parseFloat(feature.properties.out_num);
            if (num > 3000) {
                return {fillColor: "#FF0000"};
            } else if (num > 2000) {
                return {fillColor: "#F88017"};
            } else if (num > 1000) {
                return {fillColor: "#FFFF00"};
            } else if (num > 500) {
                return {fillColor: "#CCFB5D"};
            }
            return {fillColor: "#00FF00"};
        }
    }).addTo(map);
}

function init_edges(geojsonFeature) {
    var map = L.map('map').setView([40, 260], 4);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
    function onEachEdge(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.COUNT) {
            var count = feature.properties.COUNT;
            var origin = feature.properties.ORIGIN_ID;
            var destination = feature.properties.DESTINATION_ID;
            layer.bindPopup("There are " + count + " delayed flights from " + origin + " to " + destination);
        }
    }
    L.geoJson(geojsonFeature, {
        onEachFeature: onEachEdge,
        style: function(feature) {
            var num = parseFloat(feature.properties.COUNT);
            alert(num);
            if (num > 200) {
                return {
                    "color": "#FF0000",
                    "weight": 2,
                    "opacity": 0.65
                };
            } else if (num > 150) {
                return {
                    "color": "#F88017",
                    "weight": 1,
                    "opacity": 0.65
                };
            } else if (num > 100) {
                return {
                    "color": "#FFFF00",
                    "weight": 0.5,
                    "opacity": 0.65
                };
            } else if (num > 50) {
                return {
                    "color": "#CCFB5D",
                    "weight": 0.2,
                    "opacity": 0.65
                };
            }
            return {
                "color": "#00FF00",
                "weight": 0.1,
                "opacity": 0.65
            };
        }
    }).addTo(map);
}

function calendar() {

    var width = 960,
            height = 750,
            cellSize = 25; // cell size

    //var no_months_in_a_row = Math.floor(width / (cellSize * 7 + 50));
    var no_months_in_a_row = 3;
    var shift_up = cellSize * 3;

    var day = d3.time.format("%w"), // day of the week
            day_of_month = d3.time.format("%e") // day of the month
    day_of_year = d3.time.format("%j")
    week = d3.time.format("%U"), // week number of the year
            month = d3.time.format("%m"), // month number
            year = d3.time.format("%Y"),
            percent = d3.format(".1%"),
            format = d3.time.format("%Y-%m-%d");


    var minColor = 3300;
    var maxColor = 9900;

    var svg = d3.select("#calendar").selectAll("svg")
            .data(d3.range(2014, 2015))
            .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "RdYlGn")
            .append("g")

    var rect = svg.selectAll(".day")
            .data(function(d) {
        return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
            .enter().append("rect")
            .attr("class", "day")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) {
        var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
        return day(d) * cellSize + month_padding;
    })
            .attr("y", function(d) {
        var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
        var row_level = Math.ceil(month(d) / (no_months_in_a_row));
        return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize / 2 - shift_up;
    })
            .datum(format);

    var month_titles = svg.selectAll(".month-title")  // Jan, Feb, Mar and the whatnot
            .data(function(d) {
        return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
            .enter().append("text")
            .text(monthTitle)
            .attr("x", function(d, i) {
        var month_padding = 1.2 * cellSize * 7 * ((month(d) - 1) % (no_months_in_a_row));
        return month_padding;
    })
            .attr("y", function(d, i) {
        var week_diff = week(d) - week(new Date(year(d), month(d) - 1, 1));
        var row_level = Math.ceil(month(d) / (no_months_in_a_row));
        return (week_diff * cellSize) + row_level * cellSize * 8 - cellSize - shift_up;
    })
            .attr("class", "month-title")
            .attr("d", monthTitle);

    var year_titles = svg.selectAll(".year-title")  // Jan, Feb, Mar and the whatnot
            .data(function(d) {
        return d3.time.years(new Date(d, 0, 1), new Date(d + 1, 0, 1));
    })
            .enter().append("text")
            .text(yearTitle)
            .attr("x", function(d, i) {
        return width / 2 - 100;
    })
            .attr("y", function(d, i) {
        return cellSize * 5.5 - shift_up;
    })
            .attr("class", "year-title")
            .attr("d", yearTitle);

    //  Tooltip Object
    var tooltip = d3.select("body")
            .append("div").attr("id", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .text("a simple tooltip");

    load(0);

    function load(value) {
        d3.csv("delay.csv", function(error, csv) {
            var data = d3.nest()
                    .key(function(d) {
                return d.Date;
            })
                    .rollup(function(d) {
                if (value == 1) {
                    return d[0].ArrDelay;
                } else if (value == 2) {
                    return d[0].DeptDelay;
                } else {
                    return d[0].TotalCancel;
                }
            })
                    .map(csv);


            rect.filter(function(d) {
                return d in data;
            })
                    .attr("class", function(d) {
                return "day " + color(data[d]);
            })
                    .select("title")
                    .text(function(d) {
                return d + ": " + percent(data[d]);
            });


            //  Tooltip
            rect.on("mouseover", mouseover);
            rect.on("mouseout", mouseout);
            function mouseover(d) {
                tooltip.style("visibility", "visible");
                var percent_data = (data[d] !== undefined) ? (data[d]) : (0);
                var purchase_text = d + ": " + percent_data;

                tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                tooltip.html(purchase_text)
                        .style("left", (d3.event.pageX) + 30 + "px")
                        .style("top", (d3.event.pageY) + "px");
            }
            function mouseout(d) {
                tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                var $tooltip = $("#tooltip");
                $tooltip.empty();
            }
        });
    }


    var color = d3.scale.quantize()
            .domain([minColor, maxColor])
            .range(d3.range(11).map(function(d) {
        return "q" + d + "-11";
    }));

    function dayTitle(t0) {
        return t0.toString().split(" ")[2];
    }
    function monthTitle(t0) {
        return t0.toLocaleString("en-us", {month: "long"});
    }
    function yearTitle(t0) {
        return t0.toString().split(" ")[3];
    }
}

// This method converts a csv (as Text String) into a well-formed JSON object
function node(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = ["ID", "LABEL", "N", "W", "E", "out_num", "out_min", "in_num", "in_min"];
    for (var i = 1; i < lines.length; i++) {
        var properties = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            properties[headers[j]] = currentline[j];
        }
        var north_str = properties["N"];
        var west_str = properties["W"];
        var east_str = properties["E"];
        var north = parseFloat(north_str);
        var west = parseFloat(west_str);
        var east = parseFloat(east_str);
        var node = {
            "type": "Feature",
            "properties": properties,
            "geometry": {
                "type": "Point",
                "coordinates": [east, north]
            }
        };
        result.push(node);
    }
    return result;
}

function edge(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = ["ORIGIN_ID", "DESTINATION_ID", "ORIGIN_N", "ORIGIN_E", "DESTINATION_N", "DESTINATION_E", "COUNT"];
    for (var i = 1; i < lines.length; i++) {
        var properties = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            properties[headers[j]] = currentline[j];
        }
        var origin_n = parseFloat(properties["ORIGIN_N"]);
        var origin_e = parseFloat(properties["ORIGIN_E"]);
        var destination_n = parseFloat(properties["DESTINATION_N"]);
        var destination_e = parseFloat(properties["DESTINATION_E"]);
        var start = [origin_e, origin_n];
        var end = [destination_e, destination_n];
        var edge = {
            "type": "Feature",
            "properties": properties,
            "geometry": {
                "type": "LineString",
                "coordinates": [start, end]
            }
        };
        result.push(edge);
    }
    return result;
}

function bankai(){
    //Create the new dc.js cjart objects & link to div
    numberOfDelayedFlightChart = dc.barChart("#dc-flight-chart");
    totalDelayChart = dc.barChart("#dc-totalDelay-chart");
    delayFrequencyChart = dc.lineChart("#dc-delayFrequency-chart");
    dayOfWeekChart = dc.rowChart("#dc-newdayweek-chart");
    iDelay = dc.barChart("#iDelay");
    airlineDelayChart = dc.barChart("#dc-airlineDelay-chart");
    airportDelayChart = dc.barChart("#dc-airportDelay-chart");
    dataTable = dc.dataTable("#dc-table-graph");
    
    //load data from a csv file 
    d3.csv("FINAL.csv",function(data){
    
        //format our data 
        function parseDate(d) {

            var index = d.lastIndexOf("-");
            var len = d.length;
            var hhmm = parseInt(d.substring(index + 1, len));
            var h = Math.floor(hhmm / 100);
            var m = hhmm % 100;
            h = h.toString();
            m = m.toString();
            return new Date(d.substring(0, 4), d.substring(5, 7) - 1, d.substring(8, 10), h, m);
        }
        var formatNumber = d3.format(",d"), // 5000 = 5,000
            formatChange = d3.format("+,d"), // work for both negative and positive numbers
            formatDate = d3.time.format("%b %d"), // formatDate = January 12, 2014
            formatTime = d3.time.format("%I:%M %p"),// formatTime = 12:13 am, 08:23 am , 09:34 am
            formatDate2= d3.time.format("%d %b %Y"),
            formatDate3 = d3.time.format("%d %b %Y %I:%M %p");
            
        data.forEach(function(d,i){
            
            d.index = i;
            d.date = parseDate(d.FL_DATE + "-" + d.CRS_ARR_TIME);
            d.carrier = d.UNIQUE_CARRIER;
            d.delay = +d.ARR_DELAY_NEW;
            d.originAirport = d.ORIGIN_AIRPORT_LABEL;
            d.destAirport = d.DEST_AIRPORT_LABEL;
            d.CarrierDelay = +d.CARRIER_DELAY;
            d.WeatherDelay = +d.WEATHER_DELAY;
            d.NasDelay = +d.NAS_DELAY;
            d.SecurityDelay = +d.SECURITY_DELAY;
            d.LateAircraftDelay = +d.LATE_AIRCRAFT_DELAY;
            d.carrierName = d.CARRIER_LABEL;
        });
        //Crossfilter is fine now..
        //Run the data through crossfilter and load our 'facts'
        var facts = crossfilter(data);
        var all = facts.groupAll();
        
        //For the number of delayed flights per day
        var date = facts.dimension (function (d){
            return d3.time.day(d.date);
        });
        var dates = date.group();
        //For delay by day
        var delayByDay = facts.dimension (function(d){
             return d3.time.day(d.date);
        });
        var delayByDayGroup = date.group().reduceSum(function (d) {
            return d.delay;
        });
        //For delay by causes
        var delayByCauses = facts.dimension (function(d){
             return d3.time.day(d.date);
        });
        var delayByCausesGroup = date.group().reduce(
                
                function(p,v){
                    p.count = p.count + 1;
                    p.CarrierDelay = p.CarrierDelay + v.CarrierDelay;
                    p.WeatherDelay = p.WeatherDelay + v.WeatherDelay;
                    p.NasDelay = p.NasDelay + v.NasDelay;
                    p.SecurityDelay = p.SecurityDelay + v.SecurityDelay;
                    p.LateAircraftDelay = p.LateAircraftDelay + v.LateAircraftDelay;
                    return p;
                },
                function (p,v){
                    
                    p.count = p.count - 1;
                    p.CarrierDelay = p.CarrierDelay - v.CarrierDelay;
                    p.WeatherDelay = p.WeatherDelay - v.WeatherDelay;
                    p.NasDelay = p.NasDelay - v.NasDelay;
                    p.SecurityDelay = p.SecurityDelay - v.SecurityDelay;
                    p.LateAircraftDelay = p.LateAircraftDelay - v.LateAircraftDelay;
                    return p;
                    
                },
                function(){
                    
                    return {
                        
                        CarrierDelay : 0,
                        WeatherDelay: 0,
                        NasDelay : 0,
                        SecurityDelay: 0,
                        LateAircraftDelay : 0
                        
                    };
                    
                }
        );
        
        
        //For the frequency of delays 
        var delay = facts.dimension(function (d) {
            return d.delay;
        });
        var delays = delay.group().reduceCount(function (d) {
            return d.delay;
        });
        
        //For indivdual delay 
        var CarrierDelay = facts.dimension(function (d){
            return d.CarrierDelay;
        });
        var WeatherDelay = facts.dimension (function (d){
            return d.WeatherDelay;
        });
        var NasDelay = facts.dimension (function (d){
            return d.NasDelay;
        });
        var SecurityDelay = facts.dimension (function (d){
            return d.SecurityDelay;
        });
        var LateAircraftDelay = facts.dimension (function (d){
            return d.LateAircraftDelay;
        });
      
        //cannot return the color properly
        var colorRenderlet = function (chart) {
            chart.selectAll("rect.bar")
            .on("click", function (d) {
                function setAttr(selection, keyName) {
                    selection.style("text", function (d) {
                        if (d[keyName] === "CarrierDelay") 
                            chart.showStack("CarrierDelay")
                        else if (d[keyName] === "WeatherDelay") return "";
                        else if (d[keyName] === "NasDelay") return "";
                        else if (d[keyName] === "SecurityDelay") return "";
                        else if (d[keyName] === "LateAircraftDelay") return "";
                    });
                }
                setAttr(chart.selectAll("g.stack").selectAll("rect.bar"), "layer");
                setAttr(chart.selectAll("g.dc-legend-item").selectAll("rect"), "name")
            });
            //dc.renderAll("iDelay");
        };
        
        //For individual airline delays
        var airline = facts.dimension (function (d){
          return d.carrier;
        });
        
        var  airlines = airline.group().reduceSum(function (d){
            return d.delay;
        });
        
        //For indivdual airport delays
        var airport = facts.dimension(function (d){
           return d.originAirport; 
        });
        var airports = airport.group().reduceSum(function (d){
            return d.delay;
        });
        
        //helper method 
        function getDayofWeek(d){
            
            var day = d.getDay();
            switch (day) {
                case 0:
                    return "Sun";
                case 1:
                    return "Mon";
                case 2:
                    return "Tue";
                case 3:
                    return "Wed";
                case 4:
                    return "Thu";
                case 5:
                    return "Fri";
                case 6:
                    return "Sat";
            }
        }
        
        
        //For mon,tue,wed,thu.fri,sat,sun
        var dayOfWeek = facts.dimension(function (d) {
        var day = d.date.getDay();
        switch (day) {
            case 0:
                return "0.Sun";
            case 1:
                return "1.Mon";
            case 2:
                return "2.Tue";
            case 3:
                return "3.Wed";
            case 4:
                return "4.Thu";
            case 5:
                return "5.Fri";
            case 6:
                return "6.Sat";
            }
        });
        var dayOfWeekGroup = dayOfWeek.group();
        
        dc.dataCount(".dc-data-count")
           .dimension(facts)
           .group(all);
        
        //For visualistion
        
        numberOfDelayedFlightChart.width(920)
                .height(150)
                .margins({top: 10, right: 15, bottom: 20, left: 50})
                .dimension(delayByDay)
                .group(dates)
                .transitionDuration(10)
                .centerBar(true)	
                .gap(1)
                .renderTitle(true)
                .title(function (d){
                    return  getDayofWeek(d.data.key)+" "+ formatDate2(d.data.key)+": "+d.data.value;
                })
                .round(d3.time.day.round)
                .xUnits(d3.time.days)
                .x(d3.time.scale() //timescale 
                .domain([new Date(2013, 11, 31), new Date(2014, 1, 1)]) //domain will be hardcoded 
                .rangeRound([0, 5 * 120])) // convert the time scale to bar graph
                .elasticY(true)
                //.brushOn(false)
                .filter([new Date(2014, 0, 10), new Date(2014, 0, 20)])
                .xAxis().tickFormat(d3.time.format("%b %d"))
                .ticks(d3.time.day, 4);
               
        totalDelayChart.width(460)
            .height(150)
            .margins({top: 10, right: 15, bottom: 20, left: 50})
            .dimension(delayByDay)
            .group(delayByDayGroup)
            .transitionDuration(1)
            .centerBar(true)
            .gap(1)
            .round(d3.time.day.round)
            .xUnits(d3.time.days)
            .x(d3.time.scale() //timescale 
            .domain([new Date(2013, 11, 31), new Date(2014, 1, 1)]) //domain will be hardcoded 
            .rangeRound([0, 5 * 120])) // convert the time scale to bar graph 
            .elasticY(true)
            .filter([new Date(2014, 0, 10), new Date(2014, 0, 20)])
            .xAxis().tickFormat(d3.time.format("%b %d"))
            .ticks(d3.time.day, 4);
        
        //For indivdual delays
        iDelay
            .width(450)
            .height(150)
            .margins({top: 10, right: 15, bottom: 20, left: 50})
            .transitionDuration(10)
            .gap(1)
            .dimension(delayByDay)
            .group(delayByCausesGroup,"CarrierDelay")
            .valueAccessor(function (p) {
                return p.value.CarrierDelay;
            })
            .stack(delayByCausesGroup , "WeatherDelay" ,function (p) {
                return p.value.WeatherDelay;
            })
            .stack(delayByCausesGroup,"NasDelay" ,function (p) {
                return p.value.NasDelay;
            })
            .stack(delayByCausesGroup, "SecurityDelay",function (p) {
                return p.value.SecurityDelay;
            })
            .stack(delayByCausesGroup,"LateAircraftDelay", function (p) {
                return p.value.LateAircraftDelay;
            })
            .gap(1)
            .round(d3.time.day.round)
            .x(d3.time.scale() //timescale 
            .domain([new Date(2013, 11, 31), new Date(2014, 1, 1)]) //domain will be hardcoded 
            .rangeRound([0, 5 * 120])) // convert the time scale to bar graph
            .xUnits(d3.time.days)
            .elasticY(true)
            .brushOn(false)
            .renderlet(colorRenderlet)
            .renderTitle(true)
                .title(function (d){
                    
                    return  getDayofWeek(d.data.key)+" "+ formatDate2(d.data.key)+"\n"+d.data.value.CarrierDelay
                
             })
               .title(function (d){
                    
                    return  "CarrierDelay: "+d.data.value.CarrierDelay +
                    "\n" + "WeatherDelay: "+d.data.value.WeatherDelay +
                    "\n" + "NasDelay: "+d.data.value.NasDelay +
                    "\n" + "SecurityDelay: "+d.data.value.SecurityDelay +
                    "\n" + "LateAircraftDelay: "+d.data.value.LateAircraftDelay 

                     
                    
                    
            
                
             })
             
            .legend(dc.legend().x(350).y(0).itemHeight(13).gap(5))
            .xAxis().tickFormat(d3.time.format("%b %d"))
            .ticks(d3.time.day, 4);
             
        //For delay frequency
        delayFrequencyChart.width(300)
            .height(220)
            .margins({top: 10, right: 10, bottom: 20, left: 50})
            .dimension(delay)
            .group(delays)   
            .renderArea(true)
            .brushOn(false)			// added for title
            .title(function(d){
            return ("Arrival Delay: "+(d.data.key)+" minutes")
            + "\nFrequency: " + d.data.value;
            })
            .elasticY(true)
            .elasticX(true)
            .x(d3.scale.linear().domain([0, 1600]))
            .xAxis();
        
  
        
        
        //For day of week
        dayOfWeekChart.width(300)
            .height(250)
            .margins({top: 10, left: 10, right: 20, bottom: 50})
            .dimension(dayOfWeek)
            .group(dayOfWeekGroup)
            .colors(d3.scale.category10())
            .label(function (d){
                return d.key.split(".")[1];
            })
            .title(function(d){return d.value;})
            .elasticX(true)
            .xAxis().ticks(4);  
        
        //For sum of delay for each airline
        airlineDelayChart.width(320)
            .height(240)
            .margins({top: 10, right: 10, bottom: 20, left: 50})
            .dimension(airline)
            .group(airlines)
            .transitionDuration(10)
            .renderTitle(true)
                .title(function (d){
                    return  d.data.key+": "+ d.data.value+" minutes";
                })
            .centerBar(true)
            .gap(1)
            .x(d3.scale.ordinal().domain(["", "AA", "AS", "B6","DL","EV","UA","US","OO","VX","WN","F9","FL","HA","MQ"]))
            //.x(d3.scale.ordinal().domain(data.map(function (d) {return d.carrier; })))
            .xUnits(dc.units.ordinal) 
            .elasticY(true)
            .xAxis().tickFormat();
        
        //For sum of delay for each airport
         airportDelayChart.width(450)
            .height(220)
            .margins({top: 10, right: 10, bottom: 20, left: 50})
            .dimension(airport)
            .group(airports)
            .transitionDuration(10)
            .centerBar(true)	
            .gap(1)
            .x(d3.scale.ordinal().domain(data.map(function (d) {return d.originAirport; })))
            .xUnits(dc.units.ordinal)
            .elasticY(true)
             .xAxis().tickFormat(); 
        
        //The data table 
        dataTable.width(920).height(800)
            .dimension(date)
                .group(function(d) { return "Arrival Delay"
             })
            .size(10)
            .columns([
            function(d) { return formatDate3(d.date); },
            function(d) { return d.carrierName; },
            function(d) { return d.originAirport; },
            function(d) { return d.destAirport; },
            function(d) { return d.delay; }
        ])
        .sortBy(function(d){ return d.delay; })
        .order(d3.ascending);
        
        
        
        //Render the thing
        dc.renderAll();
        
        
    });

};