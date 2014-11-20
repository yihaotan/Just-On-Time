package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("    <head>\r\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n");
      out.write("        <title>JSP Page</title>\r\n");
      out.write("\r\n");
      out.write("        <!-- ALWAYS REMEMBER TO IMPORT FIRST, THEN OVERWRITE CSS -->\r\n");
      out.write("\r\n");
      out.write("        <!-- jQuery -->\r\n");
      out.write("        <script src=\"//code.jquery.com/jquery-1.11.0.min.js\"></script>\r\n");
      out.write("        <script src=\"//code.jquery.com/jquery-migrate-1.2.1.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("        <!-- BOOTSTRAP: Latest compiled and minified CSS -->\r\n");
      out.write("        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css\">\r\n");
      out.write("        <!-- BOOTSTRAP: Optional theme -->\r\n");
      out.write("        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap-theme.min.css\">\r\n");
      out.write("        <!-- BOOTSTRAP: Latest compiled and minified JavaScript -->\r\n");
      out.write("        <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("        <!-- All-Time-Favourite: Leaflet.js -->\r\n");
      out.write("        <link rel=\"stylesheet\" href=\"http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css\" />\r\n");
      out.write("        <script src=\"http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js\"></script>\r\n");
      out.write("\r\n");
      out.write("        <style>\r\n");
      out.write("\r\n");
      out.write("            @import url(http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,700);\r\n");
      out.write("\r\n");
      out.write("            body {\r\n");
      out.write("                font-family: \"Helvetica Neue\";\r\n");
      out.write("                margin: 40px auto;\r\n");
      out.write("                width: 960px;\r\n");
      out.write("                min-height: 2000px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #map { height: 500px; }\r\n");
      out.write("\r\n");
      out.write("            #body {\r\n");
      out.write("                position: relative;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            footer {\r\n");
      out.write("                padding: 2em 0 1em 0;\r\n");
      out.write("                font-size: 12px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            h1 {\r\n");
      out.write("                font-size: 96px;\r\n");
      out.write("                margin-top: .3em;\r\n");
      out.write("                margin-bottom: 0;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            h1 + h2 {\r\n");
      out.write("                margin-top: 0;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            h2 {\r\n");
      out.write("                font-weight: 400;\r\n");
      out.write("                font-size: 28px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            h1, h2 {\r\n");
      out.write("                font-family: \"Yanone Kaffeesatz\";\r\n");
      out.write("                text-rendering: optimizeLegibility;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #body > p {\r\n");
      out.write("                line-height: 1.5em;\r\n");
      out.write("                width: 640px;\r\n");
      out.write("                text-rendering: optimizeLegibility;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #charts {\r\n");
      out.write("                padding: 10px 0;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .chart {\r\n");
      out.write("                display: inline-block;\r\n");
      out.write("                height: 151px;\r\n");
      out.write("                margin-bottom: 20px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .reset {\r\n");
      out.write("                padding-left: 1em;\r\n");
      out.write("                font-size: smaller;\r\n");
      out.write("                color: #ccc;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .background.bar {\r\n");
      out.write("                fill: #ccc;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .foreground.bar {\r\n");
      out.write("                fill: steelblue;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .axis path, .axis line {\r\n");
      out.write("                fill: none;\r\n");
      out.write("                stroke: #000;\r\n");
      out.write("                shape-rendering: crispEdges;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .axis text {\r\n");
      out.write("                font: 10px sans-serif;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .brush rect.extent {\r\n");
      out.write("                fill: steelblue;\r\n");
      out.write("                fill-opacity: .125;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .brush .resize path {\r\n");
      out.write("                fill: #eee;\r\n");
      out.write("                stroke: #666;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #hour-chart {\r\n");
      out.write("                width: 260px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #delay-chart {\r\n");
      out.write("                width: 230px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #distance-chart {\r\n");
      out.write("                width: 420px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #date-chart {\r\n");
      out.write("                width: 920px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list {\r\n");
      out.write("                min-height: 1024px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list .date,\r\n");
      out.write("            #flight-list .day {\r\n");
      out.write("                margin-bottom: .4em;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list .flight {\r\n");
      out.write("                line-height: 1.5em;\r\n");
      out.write("                background: #eee;\r\n");
      out.write("                width: 640px;\r\n");
      out.write("                margin-bottom: 1px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list .time {\r\n");
      out.write("                color: #999;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list .flight div {\r\n");
      out.write("                display: inline-block;\r\n");
      out.write("                width: 100px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list div.distance,\r\n");
      out.write("            #flight-list div.delay {\r\n");
      out.write("                width: 160px;\r\n");
      out.write("                padding-right: 10px;\r\n");
      out.write("                text-align: right;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #flight-list .early {\r\n");
      out.write("                color: green;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            aside {\r\n");
      out.write("                position: absolute;\r\n");
      out.write("                left: 740px;\r\n");
      out.write("                font-size: smaller;\r\n");
      out.write("                width: 220px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            #calendar{\r\n");
      out.write("                width: 800px;\r\n");
      out.write("                margin: 0 auto;\r\n");
      out.write("            }\r\n");
      out.write("            .background {\r\n");
      out.write("                fill: #eee;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            line {\r\n");
      out.write("                stroke: #fff;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            text.active {\r\n");
      out.write("                fill: red;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .day {\r\n");
      out.write("                fill: #fff;\r\n");
      out.write("                stroke: #ccc;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            .month {\r\n");
      out.write("                fill: none;\r\n");
      out.write("                stroke: #fff;\r\n");
      out.write("                stroke-width: 4px;\r\n");
      out.write("            }\r\n");
      out.write("            .year-title {\r\n");
      out.write("                font-size: 1.5em;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("            /* color ranges */\r\n");
      out.write("            .RdYlGn .q0-11{fill:#ffffcc}\r\n");
      out.write("            .RdYlGn .q1-11{fill:#ffeda0}\r\n");
      out.write("            .RdYlGn .q2-11{fill:#fed976}\r\n");
      out.write("            .RdYlGn .q3-11{fill:#feb24c}\r\n");
      out.write("            .RdYlGn .q4-11{fill:#fd8d3c}\r\n");
      out.write("            .RdYlGn .q5-11{fill:#fc4e2a}\r\n");
      out.write("            .RdYlGn .q6-11{fill:#fc4e2a}\r\n");
      out.write("            .RdYlGn .q7-11{fill:#fc4e2a}\r\n");
      out.write("            .RdYlGn .q8-11{fill:#e31a1c}\r\n");
      out.write("            .RdYlGn .q9-11{fill:#bd0026}\r\n");
      out.write("            .RdYlGn .q10-11{fill:#800026}\r\n");
      out.write("\r\n");
      out.write("            /* hover info */\r\n");
      out.write("            #tooltip {\r\n");
      out.write("                background-color: #fff;\r\n");
      out.write("                border: 2px solid #ccc;\r\n");
      out.write("                padding: 10px;\r\n");
      out.write("            }\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("        </style>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("    </head>\r\n");
      out.write("    <body>\r\n");
      out.write("\r\n");
      out.write("        <!--\r\n");
      out.write("                <a href=\"https://github.com/square\"><img src=\"logotype.png\" width=\"122\" height=\"31\"></a>\r\n");
      out.write("        -->    \r\n");
      out.write("\r\n");
      out.write("        <h1>Just On Time</h1>\r\n");
      out.write("        <h2>US Flight Delay Analysis</h2>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("        <!--\r\n");
      out.write("                <p><b>Crossfilter</b> is a <a href=\"https://github.com/square/crossfilter\">JavaScript library</a> for exploring large multivariate datasets in the browser. Crossfilter supports extremely fast (&lt;30ms) interaction with coordinated views, even with datasets containing a million or more records; we built it to power analytics for <a href=\"https://squareup.com/register\">Square Register</a>, allowing merchants to slice and dice their payment history fluidly.\r\n");
      out.write("                <p>Since most interactions only involve a single dimension, and then only small adjustments are made to the filter values, incremental filtering and reducing is significantly faster than starting from scratch. Crossfilter uses sorted indexes (and a few bit-twiddling hacks) to make this possible, dramatically increasing the perfor&shy;mance of live histograms and top-<i>K</i> lists. For more details on how Crossfilter works, see the <a href=\"https://github.com/square/crossfilter/wiki/API-Reference\">API reference</a>.\r\n");
      out.write("                <h2>Example: Airline on-time performance</h2>\r\n");
      out.write("                <p>The coordinated visualizations below (built with <a href=\"http://mbostock.github.com/d3/\">D3</a>) show nearly a quarter-million flights from early 2001: part of the <a href=\"http://stat-computing.org/dataexpo/2009/\">ASA Data Expo</a> dataset. The dataset is 5.3MB, so it might take a few seconds to download. Click and drag on any chart to filter by the associated dimension. The table beneath shows the eighty most recent flights that match the current filters; these are the <i>details on demand</i>, anecdotal evidence you can use to weigh different hypotheses.\r\n");
      out.write("                <p>Some questions to consider: How does time-of-day correlate with <a href=\"javascript:filter([null, [100, 150], null, null])\">arrival delay</a>? Are <a href=\"javascript:filter([null, null, [1700, 2000], null])\">longer</a> or <a href=\"javascript:filter([null, null, [0, 300], null])\">shorter</a> flights more likely to arrive early? What happened on <a href=\"javascript:filter([null, [80, 150], null, [new Date(2001, 0, 12), new Date(2001, 0, 13)]])\">January 12</a>? How do flight patterns differ between <a href=\"javascript:filter([null, null, null, [new Date(2001, 0, 27), new Date(2001, 0, 29)]])\">weekends</a> and <a href=\"javascript:filter([null, null, null, [new Date(2001, 0, 29), new Date(2001, 1, 3)]])\">weekdays</a>, or <a href=\"javascript:filter([[4, 7], null, null, null])\">mornings</a> and <a href=\"javascript:filter([[21, 24], null, null, null])\">nights</a>? <a href=\"https://github.com/square/crossfilter/tree/gh-pages\">Fork this example</a> and try your own data!\r\n");
      out.write("        -->\r\n");
      out.write("\r\n");
      out.write("        <nav class=\"navbar navbar-default\" role=\"navigation\">\r\n");
      out.write("            <div class=\"container-fluid\">\r\n");
      out.write("                <!-- Brand and toggle get grouped for better mobile display -->\r\n");
      out.write("                <div class=\"navbar-header\">\r\n");
      out.write("                    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n");
      out.write("                        <span class=\"sr-only\">Toggle navigation</span>\r\n");
      out.write("                        <span class=\"icon-bar\"></span>\r\n");
      out.write("                        <span class=\"icon-bar\"></span>\r\n");
      out.write("                        <span class=\"icon-bar\"></span>\r\n");
      out.write("                    </button>\r\n");
      out.write("                    <a class=\"navbar-brand\" href=\"#\">Brand</a>\r\n");
      out.write("                </div>\r\n");
      out.write("\r\n");
      out.write("                <!-- Collect the nav links, forms, and other content for toggling -->\r\n");
      out.write("                <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n");
      out.write("                    <ul class=\"nav navbar-nav\">\r\n");
      out.write("                        <li class=\"active\"><a href=\"#\">Link</a></li>\r\n");
      out.write("                        <li><a href=\"#\">Link</a></li>\r\n");
      out.write("                        <li class=\"dropdown\">\r\n");
      out.write("                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <span class=\"caret\"></span></a>\r\n");
      out.write("                            <ul class=\"dropdown-menu\" role=\"menu\">\r\n");
      out.write("                                <li><a href=\"#\">Action</a></li>\r\n");
      out.write("                                <li><a href=\"#\">Another action</a></li>\r\n");
      out.write("                                <li><a href=\"#\">Something else here</a></li>\r\n");
      out.write("                                <li class=\"divider\"></li>\r\n");
      out.write("                                <li><a href=\"#\">Separated link</a></li>\r\n");
      out.write("                                <li class=\"divider\"></li>\r\n");
      out.write("                                <li><a href=\"#\">One more separated link</a></li>\r\n");
      out.write("                            </ul>\r\n");
      out.write("                        </li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                    <form class=\"navbar-form navbar-left\" role=\"search\">\r\n");
      out.write("                        <div class=\"form-group\">\r\n");
      out.write("                            <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\r\n");
      out.write("                        </div>\r\n");
      out.write("                        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n");
      out.write("                    </form>\r\n");
      out.write("                    <ul class=\"nav navbar-nav navbar-right\">\r\n");
      out.write("                        <li><a href=\"#\">Link</a></li>\r\n");
      out.write("                        <li class=\"dropdown\">\r\n");
      out.write("                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <span class=\"caret\"></span></a>\r\n");
      out.write("                            <ul class=\"dropdown-menu\" role=\"menu\">\r\n");
      out.write("                                <li><a href=\"#\">Action</a></li>\r\n");
      out.write("                                <li><a href=\"#\">Another action</a></li>\r\n");
      out.write("                                <li><a href=\"#\">Something else here</a></li>\r\n");
      out.write("                                <li class=\"divider\"></li>\r\n");
      out.write("                                <li><a href=\"#\">Separated link</a></li>\r\n");
      out.write("                            </ul>\r\n");
      out.write("                        </li>\r\n");
      out.write("                    </ul>\r\n");
      out.write("                </div><!-- /.navbar-collapse -->\r\n");
      out.write("            </div><!-- /.container-fluid -->\r\n");
      out.write("        </nav>\r\n");
      out.write("        \r\n");
      out.write("        <!-- navbar -->\r\n");
      out.write("        <input type=\"file\" id=\"input\" class=\"button\" multiple>\r\n");
      out.write("\r\n");
      out.write("        <!-- map -->\r\n");
      out.write("        <div id=\"map\"></div>\r\n");
      out.write("\r\n");
      out.write("        <!-- calendar -->\r\n");
      out.write("        <div>        \r\n");
      out.write("            <select onchange =\"load(this.value)\" onload=\"chartTitle()\" >\r\n");
      out.write("                <option value=\"0\" selected=\"selected\" >Total Cancellation </option>\r\n");
      out.write("                <option value=\"1\" >Arrival Delay </option>\r\n");
      out.write("                <option value=\"2\" >Departure Delay </option>                \r\n");
      out.write("            </select>\r\n");
      out.write("        </div>\r\n");
      out.write("        <div id=\"calendar\" class=\"clearfix\"></div>\r\n");
      out.write("\r\n");
      out.write("        <!-- crossfilter -->\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("        <script src=\"crossfilter.v1.min.js\"></script>\r\n");
      out.write("        <script src=\"d3.v3.min.js\"></script>\r\n");
      out.write("        <script src=\"functions.js\"></script>\r\n");
      out.write("\r\n");
      out.write("        <script>\r\n");
      out.write("                    // placeholder\r\n");
      out.write("                    main();\r\n");
      out.write("        </script>\r\n");
      out.write("\r\n");
      out.write("    </body>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
