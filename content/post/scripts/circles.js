function circles(id, dadosRaw, opt) {
    
        //Creating the adequad JSON format
        var dados = [
            {qtdH: 0, qtdM: 0, periodo: "Manhã", local: "Burrinhos"},
            {qtdH: 0, qtdM: 0, periodo: "Tarde", local: "Burrinhos"},
            {qtdH: 0, qtdM: 0, periodo: "Noite", local: "Burrinhos"},
            {qtdH: 0, qtdM: 0, periodo: "Manhã", local: "Bobs"},
            {qtdH: 0, qtdM: 0, periodo: "Tarde", local: "Bobs"},
            {qtdH: 0, qtdM: 0, periodo: "Noite", local: "Bobs"},
            {qtdH: 0, qtdM: 0, periodo: "Manhã", local: "Jackson"},
            {qtdH: 0, qtdM: 0, periodo: "Tarde", local: "Jackson"},
            {qtdH: 0, qtdM: 0, periodo: "Noite", local: "Jackson"}
        ];
        
        var qtdBurrinhos = 0, qtdBobs = 0, qtdJackson = 0;

        for (var i = 0; i < dadosRaw.length; i++) {
            var obj = dadosRaw[i];
            if (obj.local == "burrinhos") {
                qtdBurrinhos++;
                if (obj.horario_final < "13:00") {
                    dados[0].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[0].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else if (obj.horario_final < "18:00") {
                    dados[1].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[1].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else {
                    dados[2].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[2].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                }
            } else if (obj.local == "bobs") {
                qtdBobs++;
                if (obj.horario_final < "13:00") {
                    dados[3].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[3].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else if (obj.horario_final < "18:00") {
                    dados[4].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[4].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else {
                    dados[5].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[5].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                }
            } else {
                qtdJackson++;
                if (obj.horario_final < "13:00") {
                    dados[6].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[6].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else if (obj.horario_final < "18:00") {
                    dados[7].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[7].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                } else {
                    dados[8].qtdH += obj.homens_ciclistas + obj.homens_pedestres;
                    dados[8].qtdM += obj.mulheres_ciclistas + obj.mulheres_pedestres;
                }
            }
        }
        
        dados[0].qtdH = dados[0].qtdH/qtdBurrinhos;
        dados[0].qtdM = dados[0].qtdM/qtdBurrinhos;
        dados[1].qtdH = dados[1].qtdH/qtdBurrinhos;
        dados[1].qtdM = dados[1].qtdM/qtdBurrinhos;
        dados[2].qtdH = dados[2].qtdH/qtdBurrinhos;
        dados[2].qtdM = dados[2].qtdM/qtdBurrinhos;
        dados[3].qtdH = dados[3].qtdH/qtdBobs;
        dados[3].qtdM = dados[3].qtdM/qtdBobs;
        dados[4].qtdH = dados[4].qtdH/qtdBobs;
        dados[4].qtdM = dados[4].qtdM/qtdBobs;
        dados[5].qtdH = dados[5].qtdH/qtdBobs;
        dados[5].qtdM = dados[5].qtdM/qtdBobs;
        dados[6].qtdH = dados[6].qtdH/qtdJackson;
        dados[6].qtdM = dados[6].qtdM/qtdJackson;
        dados[7].qtdH = dados[7].qtdH/qtdJackson;
        dados[7].qtdM = dados[7].qtdM/qtdJackson;
        dados[8].qtdH = dados[8].qtdH/qtdJackson;
        dados[8].qtdM = dados[8].qtdM/qtdJackson;
       
          var grafico = d3.select(id)
          .append('svg')
            .attr('width', opt.w + opt.margin.left + opt.margin.right)
            .attr('height', opt.h + opt.margin.top + opt.margin.bottom)
          .append('g')
            .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');
        /*
         * As escalas
         */      
    
        var x = d3.scaleBand()
            .domain(dados.map((d, i) => d.local))
            .range([0, opt.w])
            .paddingInner(0);
    
        var y = d3.scaleBand()
            .domain(dados.map((d, i) => d.periodo))
            .range([0, opt.h])
            .paddingInner(0);
        
        var r = d3.scaleLinear()
            .domain([0, d3.max(dados.map((d, i) => d.qtdH))])
            .range([0, x.bandwidth()/4]);
        /*
         * As marcas
         */

        grafico.selectAll('g')
        .data(dados)
        .enter()
        .append('circle')
           .attr("cx", d => x(d.local) + x.bandwidth()/4)
           .attr("cy", d => y(d.periodo) + y.bandwidth()/2)
           .attr("r", d => r(d.qtdM))
           .attr("fill", opt.color[1])
        
        grafico.selectAll('g')
        .data(dados)
        .enter()
        .append('circle')
           .attr("cx", d => x(d.local) + x.bandwidth()/2 + x.bandwidth()/4)
           .attr("cy", d => y(d.periodo) + y.bandwidth()/2)
           .attr("r", d => r(d.qtdH))
           .attr("fill", opt.color[2])
         
        /*
         * Os eixos
         */
        grafico.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + opt.h + ")")
            .call(d3.axisBottom(x));
        grafico.append('g')
            .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(y));  // gera eixo a partir da escala
    }