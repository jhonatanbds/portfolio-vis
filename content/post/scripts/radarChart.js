/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////
	
function RadarChart(id, dataRaw, options) {
	var cfg = {
	 w: 400,				//Width of the circle
	 h: 400,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scale.category10()	//Color function
	};

	//Creating the adequad JSON format
	var data = [
		[//Burrinhos
		  {axis:"Manhã",value:0},
		  {axis:"Tarde",value:0},
		  {axis:"Noite",value:0}			
		],[//Bobs
		  {axis:"Manhã",value:0},
		  {axis:"Tarde",value:0},
		  {axis:"Noite",value:0}
		],[//Jackson
		  {axis:"Manhã",value:0},
		  {axis:"Tarde",value:0},
		  {axis:"Noite",value:0}
		]
	];
	
	var mBurrinhos = {"qtd":0, "total":0};
	var tBurrinhos = {"qtd":0, "total":0};
	var nBurrinhos = {"qtd":0, "total":0};
	var mBobs = {"qtd":0, "total":0};
	var tBobs = {"qtd":0, "total":0};
	var nBobs = {"qtd":0, "total":0};
	var mJackson = {"qtd":0, "total":0};
	var tJackson = {"qtd":0, "total":0};
	var nJackson = {"qtd":0, "total":0};
	
	for (var i = 0; i < dataRaw.length; i++) {
		var obj = dataRaw[i];
		if (obj.local == "burrinhos") {
			if (obj.horario_final < "13:00") {
				
				mBurrinhos.qtd++;
				mBurrinhos.total += obj.total_motorizados;
				mBurrinhos.total += obj.total_ciclistas;
				mBurrinhos.total += obj.total_pedestres;
			} else if (obj.horario_final < "18:00") {
				tBurrinhos.qtd++;
				tBurrinhos.total += obj.total_motorizados;
				tBurrinhos.total += obj.total_ciclistas;
				tBurrinhos.total += obj.total_pedestres;
			} else {
				nBurrinhos.qtd++;
				nBurrinhos.total += obj.total_motorizados;
				nBurrinhos.total += obj.total_ciclistas;
				nBurrinhos.total += obj.total_pedestres;
			}
		} else if (obj.local == "bobs") {
			if (obj.horario_final < "13:00") {
				mBobs.qtd++;
				mBobs.total += obj.total_motorizados;
				mBobs.total += obj.total_ciclistas;
				mBobs.total += obj.total_pedestres;
			} else if (obj.horario_final < "18:00") {
				tBobs.qtd++;
				tBobs.total += obj.total_motorizados;
				tBobs.total += obj.total_ciclistas;
				tBobs.total += obj.total_pedestres;
			} else {
				nBobs.qtd++;
				nBobs.total += obj.total_motorizados;
				nBobs.total += obj.total_ciclistas;
				nBobs.total += obj.total_pedestres;
			}
		} else {
			if (obj.horario_final < "13:00") {
				mJackson.qtd++;
				mJackson.total += obj.total_motorizados;
				mJackson.total += obj.total_ciclistas;
				mJackson.total += obj.total_pedestres;
			} else if (obj.horario_final < "18:00") {
				tJackson.qtd++;
				tJackson.total += obj.total_motorizados;
				tJackson.total += obj.total_ciclistas;
				tJackson.total += obj.total_pedestres;
			} else {
				nJackson.qtd++;	
				nJackson.total += obj.total_motorizados;
				nJackson.total += obj.total_ciclistas;
				nJackson.total += obj.total_pedestres;
			}
		}
	}

	var dataScale = d3.scale.linear()
		.domain([0, d3.max([mBurrinhos.total / mBurrinhos.qtd,
			tBurrinhos.total / tBurrinhos.qtd,
			nBurrinhos.total / nBurrinhos.qtd,
			mBobs.total / mBobs.qtd,
			tBobs.total / tBobs.qtd,
			nBobs.total / nBobs.qtd,
			mJackson.total / mJackson.qtd,
			tJackson.total / tJackson.qtd,
			nJackson.total / nJackson.qtd])])
		.range([0, 1]);


	for (var horario in data[0]) {
		if (data[0][horario].axis == "Manhã")
			data[0][horario].value = dataScale(mBurrinhos.total / mBurrinhos.qtd);
		if (data[0][horario].axis == "Tarde")
			data[0][horario].value = dataScale(tBurrinhos.total / tBurrinhos.qtd);
		else
			data[0][horario].value = dataScale(nBurrinhos.total / nBurrinhos.qtd);		
	}
	for (var horario in data[1]) {
		if (data[1][horario].axis == "Manhã")
			data[1][horario].value = dataScale(mBobs.total / mBobs.qtd);
		if (data[1][horario].axis == "Tarde")
			data[1][horario].value = dataScale(tBobs.total / tBobs.qtd);
		else
			data[1][horario].value = dataScale(nBobs.total / nBobs.qtd);		
	}
	for (var horario in data[2]) {
		if (data[2][horario].axis == "Manhã")
			data[2][horario].value = dataScale(mJackson.total / mJackson.qtd);
		if (data[2][horario].axis == "Tarde")
			data[2][horario].value = dataScale(tJackson.total / tJackson.qtd);
		else
			data[2][horario].value = dataScale(nJackson.total / nJackson.qtd);		
	}

	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('.0%'),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
	
	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });
		
	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}
				
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	//Create the outlines	
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
	
}//RadarChart