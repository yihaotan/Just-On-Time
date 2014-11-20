<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

        <script src='d3.v3.js'></script>
        <script src='crossfilter.js'></script>
        <script src='dc.js'></script>
        <link href='http://dc-js.github.io/dc.js/css/dc.css' rel='stylesheet' type='text/css'>

        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap-theme.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

        <style>

            @import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,700);

            body {
                font-family: "Helvetica Neue";
                margin: 40px auto;
                width: 960px;
                min-height: 2000px;
            }

            #map { height: 450px; }

            #body {
                position: relative;
            }

            footer {
                padding: 2em 0 1em 0;
                font-size: 12px;
            }

            h1 {
                font-size: 96px;
                margin-top: .3em;
                margin-bottom: 0;
            }

            h1 + h2 {
                margin-top: 0;
            }

            h2 {
                font-weight: 400;
                font-size: 28px;
            }

            h1, h2 {
                font-family: "Yanone Kaffeesatz";
                text-rendering: optimizeLegibility;
            }

            #body > p {
                line-height: 1.5em;
                width: 640px;
                text-rendering: optimizeLegibility;
            }

            #charts {
                padding: 10px 0;
            }

            .chart {
                display: inline-block;
                height: 151px;
                margin-bottom: 20px;
            }

            .reset {
                padding-left: 1em;
                font-size: smaller;
                color: #ccc;
            }

            #calendar{
                width: 800px;
                margin: 0 auto;
            }
            .background {
                fill: #eee;
            }

            line {
                stroke: #fff;
            }

            text.active {
                fill: red;
            }

            .day {
                fill: #fff;
                stroke: #ccc;
            }

            .month {
                fill: none;
                stroke: #fff;
                stroke-width: 4px;
            }
            .year-title {
                font-size: 1.5em;
            }

            /* color ranges */
            .RdYlGn .q0-11{fill:#ffffcc}
            .RdYlGn .q1-11{fill:#ffeda0}
            .RdYlGn .q2-11{fill:#fed976}
            .RdYlGn .q3-11{fill:#feb24c}
            .RdYlGn .q4-11{fill:#fd8d3c}
            .RdYlGn .q5-11{fill:#fc4e2a}
            .RdYlGn .q6-11{fill:#fc4e2a}
            .RdYlGn .q7-11{fill:#fc4e2a}
            .RdYlGn .q8-11{fill:#e31a1c}
            .RdYlGn .q9-11{fill:#bd0026}
            .RdYlGn .q10-11{fill:#800026}

            /* hover info */
            #tooltip {
                background-color: #fff;
                border: 2px solid #ccc;
                padding: 10px;
            }





        </style>

    </head>
    <body>

        <a href="http://transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&DB_Short_Name=On-Time"><img src="logo.png" width="50%" height="50%"></a>

        <h1>Just On Time</h1>

        <h2>Background</h2>
        <p><b>Just-On-Time</b> is a visual analytics application built for <a href="https://wiki.smu.edu.sg/1415t1is428/Main_Page">IS428 Visual Analytics for Business Intelligence</a>. Just-On-Time attempts to provide readers of this page a better understanding of US flight delay situation for selected month(s), by utilising various data visualisation techniques taught throughout IS428 course. For more information about this project, check out our <a href="https://wiki.smu.edu.sg/1415t1is428/Just_On_Time_Proposal">project wiki page</a>. 
        <p>The data used in this project was taken from Research and Innovative Technology Administration – Bureau of Transportation Statistics, USA (RITA). Click <a href="http://transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&DB_Short_Name=On-Time">here</a> for raw data. Alternatively, click the airplane picture above. </p>

        <h2>Overview</h2>
        <p>
            The whole application consists of 3 different views of the data. They are:
    <li><b>Geospatial View</b></li>
    If you want to look at which airports or flight routes experience more delays. 
    <li><b>Calendar View</b></li>
    If you want to know which dates experience more frequent delay occurrences. 
    <li><b>Crossfilter View</b></li>
    If you want to dig further and look at many dimensions of this dataset. 
</p>

<br/>

<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img alt="Brand" src="flight.png" style="max-width:35px; margin-top: -7px"></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <!--                        <li class="active"><a href="https://github.com/Laksa/Just-On-Time">Github Repository</a></li>-->
                <li><a href="https://github.com/Laksa/Just-On-Time">Github Repository</a></li>
                <li><a href="http://transtats.bts.gov/DL_SelectFields.asp?Table_ID=236&DB_Short_Name=On-Time">Data Source</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            <form class="navbar-form navbar-left" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<!-- geospatial view -->
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Geospatial View</h3>
  </div>
  <div class="panel-body">
    <p>By default, an empty US map is displayed. To view delay statistics for airports and flight routes, please kindly download the two processed files, <b>NODE.csv</b> and <b>EDGE.csv</b> from <a href="https://github.com/Laksa/Just-On-Time">our Github repository</a> and upload both of them by using the button below.</p>
    <input type="file" id="input" class="button" multiple>
  </div>
</div>
<div id="map"></div><br/>

<!-- calendar view -->
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Calendar View</h3>
  </div>
  <div class="panel-body">
    <p>A simple write up about calendar view. @Ngoc</p></div>
</div>
<div>        
    <select onchange ="load(this.value)" onload="chartTitle()" >
        <option value="0" selected="selected" >Total Cancellation </option>
        <option value="1" >Arrival Delay </option>
        <option value="2" >Departure Delay </option>                
    </select>
</div>
<div id="calendar" class="clearfix"></div>

<!-- crossfilter view -->
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Crossfilter View</h3>
  </div>
  <div class="panel-body">
    <p>A simple write up about crossfilter view. @Yihao</p>
    <div class="dc-data-count" style="float: center;">
        <h2>High-Dimensional Analysis of Delay Data - 
            <span>
                <span class="filter-count"></span>
                selected out of 
                <span class="total-count"></span>
                records | 
                <a href="javascript:dc.filterAll(); dc.renderAll();">Reset All</a>
            </span>
        </h2>
    </div>
  </div>
</div>
<div class='container' style='font: 12px sans-serif; width: 110%'>
    <div class='row'>
        <div class='span6' id='dc-totalDelay-chart'>
            <h4>
                Total arrival delay per day (minutes)
                <span>
                    <a class="reset"
                       href="javascript:totalDelayChart.filterAll();dc.redrawAll();"
                       style="display: none;">
                        reset
                    </a>
                </span>
            </h4>
        </div>
        <div class='span6' id='iDelay'>
            <h4>
                Individual causes of arrival delay (minutes)
                <span>
                    <a class="reset"
                       href="javascript:iDelay.filterAll();dc.redrawAll();"
                       style="display: none;">
                        reset
                    </a>
                </span>
            </h4>
        </div>   
    </div>

    <div class='row'>
        <div class='span12' id='dc-flight-chart'>
            <h4>
                Number of delayed flights per day
                <span>
                    <a class="reset"
                       href="javascript:numberOfDelayedFlightChart.filterAll();dc.redrawAll();"
                       style="display: none;">
                        reset
                    </a>
                </span>
            </h4>
        </div>   
    </div>
    <div class='row'>
        <div class='span4' id='dc-airlineDelay-chart'>
            <h4>Arrival delay of carriers (minutes)</h4>
        </div> 
        <div class='span4' id='dc-delayFrequency-chart'>
            <h4>
                Frequency of arrival delay (minutes)
                <span>
                    <a class="reset"
                       href="javascript:delayFrequencyChart.filterAll();dc.redrawAll();"
                       style="display: none;">
                        reset
                    </a>
                </span>
            </h4>
        </div>
        <div class='span4' id='dc-newdayweek-chart'>
            <h4>
                Number of delayed flights for day of week
                <span>
                    <a class="reset"
                       href="javascript:dayOfWeekChart.filterAll();dc.redrawAll();"
                       style="display: none;">
                        reset
                    </a>
                </span>
            </h4>
            <div class="clearfix"></div>
        </div>  
    </div>


    <div class='row'>
        <div class='span12'>
            <table class='table table-hover' id='dc-table-graph'>
                <thead>
                    <tr class='header'>
                        <th>Scheduled Arrival Time</th>
                        <th>Carrier</th>
                        <th>Origin Airport</th>
                        <th>Destination Airport</th>
                        <th>Arrival Delay (minutes)</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script src="functions.js"></script>

<script>
        var map = L.map('map').setView([40, 260], 4);
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/realis.jo4acied/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(map);
        main(map);

</script>

</body>
</html>
