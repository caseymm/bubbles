d3.helper = {};

    d3.helper.tooltip = function(){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        var attrs = {};
        var text = '';
        var styles = {};

        function tooltip(selection){

            selection.on('mouseover.tooltip', function(pD, pI){
                var name, value;
                // Clean up lost tooltips
                d3.select('body').selectAll('div.tooltip').remove();
                // Append tooltip
                tooltipDiv = d3.select('body').append('div');
                tooltipDiv.attr(attrs);
                tooltipDiv.style(styles);
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0] + 10)+'px',
                    top: (absoluteMousePos[1] - 15)+'px',
                    position: 'absolute',
                    'background-color': '#fff',
                    padding: '2px 4px 2px 4px',
                    'font-family': 'cabin',
                    'font-size': '15px',
                    'z-index': 1001,
                    '-webkit-border-radius': '5px',
                    'border-radius': '5px',
                    '-moz-border-radius': '5px',
                    border: 'solid',
                    'border-width': '1px',
                    'border-color':'#cccccc',
                    '-webkit-box-shadow':  '2px 2px 5px 2px rgba(0, 0, 0, 0.15)',
                    'box-shadow':  '2px 2px 5px 2px rgba(0, 0, 0, 0.15)',
                    '-moz-box-shadow':  '2px 2px 5px 2px rgba(0, 0, 0, 0.15)'
                });
                // Add text using the accessor function, Crop text arbitrarily
                tooltipDiv.style('width', function(d, i){ return (text(pD, pI).length > 80) ? '250px' : null; })
                    .html(function(d, i){return text(pD, pI);});
            })
            .on('mousemove.tooltip', function(pD, pI){
                // Move tooltip
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0] + 10)+'px',
                    top: (absoluteMousePos[1] - 15)+'px'
                });
                // Keep updating the text, it could change according to position
                tooltipDiv.html(function(d, i){ return text(pD, pI); });
            })
            .on('mouseout.tooltip', function(pD, pI){
                // Remove tooltip
                tooltipDiv.remove();
            });

        }

        tooltip.attr = function(_x){
            if (!arguments.length) return attrs;
            attrs = _x;
            return this;
        };

        tooltip.style = function(_x){
            if (!arguments.length) return styles;
            styles = _x;
            return this;
        };

        tooltip.text = function(_x){
            if (!arguments.length) return text;
            text = d3.functor(_x);
            return this;
        };

        return tooltip;
    };