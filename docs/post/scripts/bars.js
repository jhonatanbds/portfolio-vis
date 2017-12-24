function bars(id, dadosRaw, opt, local) {

    //Creating the adequad JSON format
	var dados = [
		[//Burrinhos
		{veiculo:"Carros",value:0},
		{veiculo:"Motos",value:0},
            {veiculo:"Onibus",value:0},
            {veiculo:"Caminhões",value:0}
          			
		],[//Bobs
            {veiculo:"Carros",value:0},
		{veiculo:"Motos",value:0},
            {veiculo:"Onibus",value:0},
            {veiculo:"Caminhões",value:0}
		],[//Jackson
            {veiculo:"Carros",value:0},
		{veiculo:"Motos",value:0},
            {veiculo:"Onibus",value:0},
            {veiculo:"Caminhões",value:0}
		]
	];
	
	var carBurrinhos = 0, motBurrinhos = 0, oniBurrinhos = 0, camBurrinhos = 0,
      carBobs = 0,	motBobs = 0, oniBobs = 0, camBobs = 0,
      carJackson = 0,	motJackson = 0, oniJackson = 0, camJackson = 0,
      qtdBurrinhos = 0, qtdBobs = 0, qtdJackson = 0;
	
	for (var i = 0; i < dadosRaw.length; i++) {
		var obj = dadosRaw[i];
		if (obj.local == "burrinhos") {
            carBurrinhos += obj.carros;
            motBurrinhos += obj.motos;
            oniBurrinhos += obj.onibus;
            camBurrinhos += obj.caminhoes;
            qtdBurrinhos++;
		} else if (obj.local == "bobs") {
            carBobs += obj.carros;
            motBobs += obj.motos;
            oniBobs += obj.onibus;
            camBobs += obj.caminhoes;
            qtdBobs++;
		} else {
		carJackson += obj.carros;
            motJackson += obj.motos;
            oniJackson += obj.onibus;
            camJackson += obj.caminhoes;
            qtdJackson++;
		}
	}

	for (var veiculo in dados[0]) {
		if (dados[0][veiculo].veiculo == "Carros")
			dados[0][veiculo].value = carBurrinhos / qtdBurrinhos;
		else if (dados[0][veiculo].veiculo == "Motos")
			dados[0][veiculo].value = motBurrinhos / qtdBurrinhos;
		else if (dados[0][veiculo].veiculo == "Onibus")
                  dados[0][veiculo].value = oniBurrinhos / qtdBurrinhos;
            else
                  dados[0][veiculo].value = camBurrinhos / qtdBurrinhos;
	}
	for (var veiculo in dados[1]) {
		if (dados[1][veiculo].veiculo == "Carros")
                  dados[1][veiculo].value = carBobs / qtdBobs;
            else if (dados[1][veiculo].veiculo == "Motos")
                  dados[1][veiculo].value = motBobs / qtdBobs;
            else if (dados[1][veiculo].veiculo == "Onibus")
                  dados[1][veiculo].value = oniBobs / qtdBobs;
            else
                  dados[1][veiculo].value = camBobs / qtdBobs;		
	}
	for (var veiculo in dados[2]) {
		if (dados[2][veiculo].veiculo == "Carros")
                  dados[2][veiculo].value = carJackson / qtdJackson;
            else if (dados[2][veiculo].veiculo == "Motos")
                  dados[2][veiculo].value = motJackson / qtdJackson;
            else if (dados[2][veiculo].veiculo == "Onibus")
                  dados[2][veiculo].value = oniJackson / qtdJackson;
            else
                  dados[2][veiculo].value = camJackson / qtdJackson;		
      }
   
      var grafico = d3.select(id) // cria elemento <svg> com um <g> dentro
      .append('svg')
        .attr('width', opt.w + opt.margin.left + opt.margin.right)
        .attr('height', opt.h + opt.margin.top + opt.margin.bottom)
      .append('g') // para entender o <g> vá em x03-detalhes-svg.html
        .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');
     /*
     * As escalas
     */      

      var x1 = d3.scaleBand()
            .domain(dados[0].map((d, i) => d.veiculo))
            .range([0, opt.w/3])
            .paddingInner(0.5);

      var y = d3.scaleLinear()
            .domain([0, d3.max([dados[0][0].value]) + 40])
            .range([opt.h, 0]);
     /*
     * As marcas
     */
      grafico.selectAll('g')
            .data(dados[local])
            .enter()
              .append('rect')
                .attr('x', d => x1(d.veiculo))
                .attr('width', x1.bandwidth())
                .attr('y', d => y(d.value))
                .attr('height', (d) => opt.h - y(d.value))
                .attr("fill", opt.color[local]);
      
     /*
     * Os eixos
     */
      grafico.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + opt.h + ")")
            .call(d3.axisBottom(x1));
      
      grafico.append('g')
            .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(y));
      grafico.append("text")
      .attr("transform", "translate(-40," + (opt.h + opt.margin.top)/2 + ") rotate(-90)")
      .text("Quantidade");

      /*
      * Os botões
      */
      const dataKeys = [
            {local:"Burrinhos", value:0},
            {local:"Bob's", value:1},
            {local:"Jackson do Pandeiro", value:2}
      ]

      d3.select("#controls").selectAll("button.teams")
            .data(dataKeys)
            .enter()
              .append("button")
              .attr("class", "btn btn-default")
              .on("click", mudaLocal)
              .html(d => d.local);
          
          
      function mudaLocal(dado) {
            bars(id, dadosRaw, opt, dado.local)           
      }
}