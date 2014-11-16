/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Create the dc.js chart objects & link to div
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
                        if (d[keyName] === "CarrierDelay") return "";
                        else if (d[keyName] === "WeatherDelay") return "";
                        else if (d[keyName] === "NasDelay") return "";
                        else if (d[keyName] === "SecurityDelay") return "";
                        else if (d[keyName] === "LateAircraftDelay") return "";
                    });
                }
                setAttr(chart.selectAll("g.stack").selectAll("rect.bar"), "layer");
                setAttr(chart.selectAll("g.dc-legend-item").selectAll("rect"), "name")
            });
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
                    return  getDayofWeek(d.data.key)+" "+ formatDate2(d.data.key);
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
            // .x(d3.scale.ordinal().domain(data.map(function (d) {return d.carrier; })))
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
        
        
        
        //Render the shit
        dc.renderAll();
       
        
    });

  };


