---
title: "Visualizando nossa água"
date: 2017-11-10
tags: []
draft: false
---

<p>
  O objetivo da visualização "Visualizando nossa água" é fazer possível com que se identifique rápido e claramente como se comportou o volume de água no açude de Boqueirão através dos anos de 1990 até o momento(2017).<br>Mediante a visualização a seguir é possível tanto ter uma visão geral, como detalhar um determinado período através da seleção da área desejada no terceiro gráfico, e ainda ter uma estimativa do volume médio no segundo.
</p>
<div id="vis0"></div>
<p>
  Através dos anos Boqueirão viveu seus altos e baixos. Em 2008, 2009 e 2011 o açude recebeu mais água do que sua capacidade permite e seu nível ultrapassou o máximo de 411 milhões de metros cubicos.<br>Algo que pode ser visualizado na próxima tabela é a quantidade de agua excedida em milhões de metros cubicos por mês nos anos citados:
</p>
<div id="vis1"></div>
<p>
  É possível perceber que geralmente são os mesmos meses que detêm os maiores números, e isso se explica pelo período de chuvas da região, que normalmente acontece entre março e agosto.<br>Bem como anos com muita chuva, Boqueirão já vivenciou anos com pouca chuva ou quase nenhuma, como foi recentemente experienciado pela população das cidades abastecidas pelo açude em 2016 até abril de 2017. Na visualização a seguir veremos as maiores secas registradas desde 1990, considerando como grave, períodos em que o açude deteve menos de 20% da sua capacidade.
</p>
<div id="vis2"></div>
<p>
  Pode ser visto que a seca a qual ainda estamos nos recuperando teve início em 2015 e o açude não pode se recuperar por meios naturais, sendo necessário alguma atitude por parte do governo para solucionar o problema. O que foi feito então foi a transposição do Rio São Francisco, que após muito tempo sendo trabalhada - ou não - enfim foi entregue e todos esperam ser uma solução definitiva.<br>Na nossa última visualização veremos então o resultado de tudo isso, nela é exibida como o açude vem crescendo em relação ao seu limite desde que tem recebido águas do São Francisco em 18 de abril desse ano:
</p>
<div id="vis3"></div>
<br>
Todos os dados foram fornecidos pela AESA.


<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>

<script type="text/javascript">
  const spec0 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse": {
        "DataInformacao": "utc:'%d/%m/%Y'"
      }
    }
  },
  "vconcat": [
    {
      "width": 520,
      "mark": "area",
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "temporal",
          "scale": {
            "domain": {
              "selection": "brush1"
            }
          },
          "axis": {
            "title": "Mês/Ano",
            "format": "%m/%Y"
          }
        },
        "y": {
          "field": "VolumePercentual",
          "type": "quantitative",
          "axis": {
            "title": "Percentual da capacidade total"
          }
        }
      }
    },
    {
      "width": 520,
      "height": 60,
      "transform": [
        {
          "filter": {
            "selection": "brush1"
          }
        }
      ],
      "mark": "rule",
      "encoding": {
        "y": {
          "aggregate": "mean",
          "field": "VolumePercentual",
          "type": "quantitative",
          "scale": {
            "domain": [
              0,
              100
            ]
          },
          "axis": {
            "title": "% médio"
          }
        },
        "color": {
          "value": "firebrick"
        },
        "size": {
          "value": 3
        }
      }
    },
    {
      "width": 520,
      "height": 60,
      "mark": "area",
      "selection": {
        "brush1": {
          "type": "interval",
          "encodings": [
            "x"
          ],
          "on": "[mousedown, window:mouseup] > window:mousemove!",
          "translate": "[mousedown, window:mouseup] > window:mousemove!",
          "zoom": "wheel!",
          "mark": {
            "fill": "#333",
            "fillOpacity": 0.125,
            "stroke": "white"
          },
          "resolve": "global"
        }
      },
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "temporal",
          "axis": {
            "title": "Ano",
            "format": "%Y"
          }
        },
        "y": {
          "field": "VolumePercentual",
          "type": "quantitative",
          "axis": {
            "title": "%",
            "tickCount": 3,
            "grid": false
          }
        }
      }
    }
  ]
};
vegaEmbed('#vis0', spec0).catch(console.warn);
</script>
<script>
    const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse": {
        "DataInformacao": "utc:'%d/%m/%Y'"
      }
    }
  },
  "vconcat": [
    {
      "transform": [
          {"filter": {"field": "DataInformacao", "range": [{"year": 2008, "month": "jan", "date": 1}, {"year": 2008, "month": "dec", "date": 20}] }},
          {"filter": {"field": "Volume", "range": [411.69, 500]}},
          {"calculate": "datum.Volume - 411.69", "as": "b2"}
      ],
      "width": 520,
      "height": 80,
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "ordinal",
          "timeUnit": "month",
          "axis": {
            "title": "Meses do ano de 2008"
          }
        },
        "y": {
          "field": "b2",
          "type": "quantitative",
          "scale": {"domain": [0,60]},
          "axis": {
            "title": "Litros excedidos"
          }
        }
      }
    },
    {
      "transform": [
          {"filter": {"field": "DataInformacao", "range": [{"year": 2009, "month": "jan", "date": 1}, {"year": 2009, "month": "dec", "date": 20}] }},
          {"filter": {"field": "Volume", "range": [411.69, 500]}},
          {"calculate": "datum.Volume - 411.69", "as": "b2"}
      ],
      "width": 520,
      "height": 80,
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "ordinal",
          "timeUnit": "month",
          "axis": {
            "title": "Meses do ano de 2009"
          }
        },
        "y": {
          "field": "b2",
          "type": "quantitative",
          "scale": {"domain": [0,60]},
          "axis": {
            "title": "Litros excedidos"
          }
        }
      }
    },
    {
      "transform": [
          {"filter": {"field": "DataInformacao", "range": [{"year": 2011, "month": "jan", "date": 1}, {"year": 2011, "month": "dec", "date": 20}] }},
          {"filter": {"field": "Volume", "range": [411.69, 500]}},
          {"calculate": "datum.Volume - 411.69", "as": "b2"}
      ],
      "width": 520,
      "height": 80,
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "ordinal",
          "timeUnit": "month",
          "axis": {
            "title": "Meses do ano de 2011"
          }
        },
        "y": {
          "field": "b2",
          "type": "quantitative",
          "scale": {"domain": [0,60]},
          "axis": {
            "title": "Litros excedidos"
          }
        }
      }
    }
  ]
};
    vegaEmbed('#vis1', spec1).catch(console.warn);
</script>
<script type="text/javascript">
  var spec2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse": {
        "DataInformacao": "utc:'%d/%m/%Y'"
      }
    }
  },
  "transform": [
    {"filter": {"field": "VolumePercentual", "range": [0, 20]}},
    {"calculate": "20-datum.VolumePercentual", "as": "Gravidade"}
  ],
  "mark": "circle",
  "width": 460,
  "height": 160,
  "encoding": {
    "y": {
      "field": "DataInformacao",
      "type": "ordinal",
      "timeUnit": "year"
    },
    "x": {
      "field": "DataInformacao",
      "type": "ordinal",
      "timeUnit": "month"
    },
    "size": {
      "field": "Gravidade",
      "type": "quantitative"
    },
    "color": {"field": "Gravidade", "type": "quantitative"}    
  }
};
vegaEmbed('#vis2', spec2).catch(console.warn);

</script>
<script type="text/javascript">
  const spec3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse": {
        "DataInformacao": "utc:'%d/%m/%Y'"
      }
    }
  },
  "transform": [
    {"filter": {"field": "DataInformacao", "range": [{"year": 2017, "month": "apr", "date": 1}, {"year": 2017, "month": "dec", "date": 20}] }}
  ],
  "layer": [
    {
      "mark": "area",
      "width": 520,
      "height": 140,
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "temporal",
          "timeUnit": "yearmonth",
          "axis": {"title": "Mês"}
        },
        "y": {
          "aggregate": "ci0",
          "field": "VolumePercentual",
          "type": "quantitative",
          "axis": {"title": "% Volume"}
        },
        "y2": {
          "aggregate": "ci1",
          "field": "VolumePercentual",
          "type": "quantitative"
        },
        "opacity": {"value": 0.3}
      }
    },
    {
      "mark": "line",
      "encoding": {
        "x": {
          "field": "DataInformacao",
          "type": "temporal",
          "timeUnit": "yearmonth"
        },
        "y": {
          "aggregate": "mean",
          "field": "VolumePercentual",
          "type": "quantitative"
        }
      }
    }
  ]
};
vegaEmbed('#vis3', spec3).catch(console.warn);
</script>
