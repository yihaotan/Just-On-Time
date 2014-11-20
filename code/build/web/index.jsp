<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

        <!-- ALWAYS REMEMBER TO IMPORT FIRST, THEN OVERWRITE CSS -->

        <!-- jQuery -->
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

        <!-- BOOTSTRAP: Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
        <!-- BOOTSTRAP: Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap-theme.min.css">
        <!-- BOOTSTRAP: Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

        <!-- All-Time-Favourite: Leaflet.js -->
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

            #map { height: 500px; }

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

            .background.bar {
                fill: #ccc;
            }

            .foreground.bar {
                fill: steelblue;
            }

            .axis path, .axis line {
                fill: none;
                stroke: #000;
                shape-rendering: crispEdges;
            }

            .axis text {
                font: 10px sans-serif;
            }

            .brush rect.extent {
                fill: steelblue;
                fill-opacity: .125;
            }

            .brush .resize path {
                fill: #eee;
                stroke: #666;
            }

            #hour-chart {
                width: 260px;
            }

            #delay-chart {
                width: 230px;
            }

            #distance-chart {
                width: 420px;
            }

            #date-chart {
                width: 920px;
            }

            #flight-list {
                min-height: 1024px;
            }

            #flight-list .date,
            #flight-list .day {
                margin-bottom: .4em;
            }

            #flight-list .flight {
                line-height: 1.5em;
                background: #eee;
                width: 640px;
                margin-bottom: 1px;
            }

            #flight-list .time {
                color: #999;
            }

            #flight-list .flight div {
                display: inline-block;
                width: 100px;
            }

            #flight-list div.distance,
            #flight-list div.delay {
                width: 160px;
                padding-right: 10px;
                text-align: right;
            }

            #flight-list .early {
                color: green;
            }

            aside {
                position: absolute;
                left: 740px;
                font-size: smaller;
                width: 220px;
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

        <!--
                <a href="https://github.com/square"><img src="logotype.png" width="122" height="31"></a>
        -->    

        <h1>Just On Time</h1>
        <h2>US Flight Delay Analysis</h2>



        <!--
                <p><b>Crossfilter</b> is a <a href="https://github.com/square/crossfilter">JavaScript library</a> for exploring large multivariate datasets in the browser. Crossfilter supports extremely fast (&lt;30ms) interaction with coordinated views, even with datasets containing a million or more records; we built it to power analytics for <a href="https://squareup.com/register">Square Register</a>, allowing merchants to slice and dice their payment history fluidly.
                <p>Since most interactions only involve a single dimension, and then only small adjustments are made to the filter values, incremental filtering and reducing is significantly faster than starting from scratch. Crossfilter uses sorted indexes (and a few bit-twiddling hacks) to make this possible, dramatically increasing the perfor&shy;mance of live histograms and top-<i>K</i> lists. For more details on how Crossfilter works, see the <a href="https://github.com/square/crossfilter/wiki/API-Reference">API reference</a>.
                <h2>Example: Airline on-time performance</h2>
                <p>The coordinated visualizations below (built with <a href="http://mbostock.github.com/d3/">D3</a>) show nearly a quarter-million flights from early 2001: part of the <a href="http://stat-computing.org/dataexpo/2009/">ASA Data Expo</a> dataset. The dataset is 5.3MB, so it might take a few seconds to download. Click and drag on any chart to filter by the associated dimension. The table beneath shows the eighty most recent flights that match the current filters; these are the <i>details on demand</i>, anecdotal evidence you can use to weigh different hypotheses.
                <p>Some questions to consider: How does time-of-day correlate with <a href="javascript:filter([null, [100, 150], null, null])">arrival delay</a>? Are <a href="javascript:filter([null, null, [1700, 2000], null])">longer</a> or <a href="javascript:filter([null, null, [0, 300], null])">shorter</a> flights more likely to arrive early? What happened on <a href="javascript:filter([null, [80, 150], null, [new Date(2001, 0, 12), new Date(2001, 0, 13)]])">January 12</a>? How do flight patterns differ between <a href="javascript:filter([null, null, null, [new Date(2001, 0, 27), new Date(2001, 0, 29)]])">weekends</a> and <a href="javascript:filter([null, null, null, [new Date(2001, 0, 29), new Date(2001, 1, 3)]])">weekdays</a>, or <a href="javascript:filter([[4, 7], null, null, null])">mornings</a> and <a href="javascript:filter([[21, 24], null, null, null])">nights</a>? <a href="https://github.com/square/crossfilter/tree/gh-pages">Fork this example</a> and try your own data!
        -->

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
                    <a class="navbar-brand" href="#">Brand</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
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
        
        <!-- navbar -->
        <input type="file" id="input" class="button" multiple>

        <!-- map -->
        <div id="map"></div>

        <!-- calendar -->
        <div>        
            <select onchange ="load(this.value)" onload="chartTitle()" >
                <option value="0" selected="selected" >Total Cancellation </option>
                <option value="1" >Arrival Delay </option>
                <option value="2" >Departure Delay </option>                
            </select>
        </div>
        <div id="calendar" class="clearfix"></div>

        <!-- crossfilter -->



        <script src="crossfilter.v1.min.js"></script>
        <script src="d3.v3.min.js"></script>
        <script src="functions.js"></script>

        <script>
                    // placeholder
                    main();
        </script>

    </body>
</html>
