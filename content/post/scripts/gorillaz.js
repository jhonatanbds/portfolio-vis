var width = 500,
            height = 500;
            
		var svg = d3.select("#chart")
				.append("svg")
				.attr('version', '1.1')
				.attr('viewBox', '0 0 '+width+' '+height)
                .attr('width', '100%');
                
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
		var simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height/2));
            
		d3.json("/portfolio-vis/post/data/artistas-semelhantes.json", function(error, graph) {
		  if (error) throw error;
			var nodes = graph.nodes.filter(k => k.size >= 70);
			var edges = graph.edges.filter(k => elimina(k.source) && elimina(k.target));
			function elimina(id){
				let guard = false;
				for (var i = 0; i < nodes.length; i++) {
					if(nodes[i].id === id){
						guard = true;
					}
				}
				return guard;
			}
			function whatGroup(valor){
				let grupo = 0;
				let cont1 = 1;
				let cont2 = 1;
				while(cont2 <= 20){
					if (valor === cont2){
						grupo = cont1;
						break;
					}
					if(cont2 % 2 === 0){
						cont1 +=1;
					}
					cont2 += 1;
				}
				return grupo;
			}
            nodes.map(k => k.group = whatGroup(95 - k.size));
            
		  var link = svg.append("g")
		      .attr("class", "link")
		    .selectAll("line")
		    	.data(edges)
		    .enter().append("line");
		  var node = svg.append("g")
		      .attr("class", "nodes")
		    .selectAll("circle")
		    	.data(nodes)
		    .enter().append("circle")
		      .attr("r", d => d.label != "Gorillaz" ? 6 : 10)
		      .attr("fill", d => d.label != "Gorillaz" ? color(d.group) : "black")
		      .call(d3.drag()
		          .on("start", dragstarted)
		          .on("drag", dragged)
		          .on("end", dragended));
		  node.append("title")
		      .text(function(d) { return d.label; });
		  simulation
		      .nodes(nodes)
		      .on("tick", ticked);
		  simulation.force("link")
		      .links(edges);
		  function ticked() {
		    link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });
		    node
		        .attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });
		  }
        });
        
		function dragstarted(d) {
		  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		  d.fx = d.x;
		  d.fy = d.y;
		}
		function dragged(d) {
		  d.fx = d3.event.x;
		  d.fy = d3.event.y;
		}
		function dragended(d) {
		  if (!d3.event.active) simulation.alphaTarget(0);
		  d.fx = null;
		  d.fy = null;
		}