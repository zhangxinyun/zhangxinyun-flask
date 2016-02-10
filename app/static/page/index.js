Vue.config.delimiters = ['${', '}'];

Vue.directive('word-cloud', {
	params: ['w'],
	paramWatchers: {
		w: function(val, oldVal) {
			var fill = d3.scale.category20();

			var layout = cloud()
				.size([$("#chart").width(), 500])
				.words(val)
				.padding(5)
				.rotate(function() { return 0; })
				.font("Impact")
				.fontSize(function(d) { return d.size; })
				.on("end", draw);
			layout.start();

			function draw(words) {
				d3.select("#chart").append("svg")
					.attr("width", layout.size()[0])
					.attr("height", layout.size()[1])
					.append("g")
					.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
					.selectAll("text")
					.data(words)
					.enter().append("text")
					.style("font-size", function(d) { return d.size + "px"; })
					.style("font-family", "Impact")
					.style("fill", function(d, i) { return fill(i); })
					.attr("text-anchor", "middle")
					.attr("transform", function(d) {
						return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					})
					.text(function(d) { return d.text; });
			}
		}
	}
});

var datasourceForm = new Vue({
	el: '#datasource-form',
	data: {
		spiders: [],
		datasource: []
	},
	methods: {
		submit: function() {
			//
		},
		refresh: function(spider) {
			alert(spider);
		}
	}
});

var chart = new Vue({
	el: '#chart',
	data: {
		words: []
	}
});

$.getJSON('/api/spiders', function(data) {
	datasourceForm.$set('spiders', data);
});

$.getJSON('/api/labels', function(data) {
	chart.$set('words', data);
});