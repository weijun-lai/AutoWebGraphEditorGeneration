define(function(view) {
	var layout;
	var count = 0;
	var elements_id = [];
	var form_elements_id = [];
	var javascript_code = "";

	console.log("Require: view.js");

	function view(div){
		// console.log("div: "+div);
	}


	return {
		show: function(div,counter,layout,x,y) {
			var view_ui = div.append("div")
			.attr('id',layout.id.info+counter+'view')
			.style("position","fixed")
			.style("left",x+"px")
			.style("top",y+"px")
			.style("cursor", "move")
			.style('z-index', ++zindex);

			var model_ui = view_ui.append("div")
			.attr("id",layout.id.info+counter+'_model_ui')
			.style('border','5px dashed rgba(255,255,255,.75)')
			.style('background-color','rgba(255,255,255,.75)')
			.style("margin",marginpx+'px')
			.style("padding",marginpx+'px')

			
			// .style("width", "40%")
			// .style("height", "100px")

			var element_ui = model_ui.append("div")
			// .style('background-color','rgba(255,255,255,.75)')
			.attr('id',layout.id.info+counter+'_ui')
			.style("padding",marginpx+'px')
			
			element_ui.append('span')
			.text('WebView'.toUpperCase())
			.style("padding",marginpx+'px')
			.style("display","block")
			// .style("display","list-item")
			var e,s;

			// console.log(layout);

			for (var d in layout) {

				if (d == 'title') {
					e = element_ui//.append('li')
					.append('span')
					// .style('background-color','rgba(25,200,25,.75)')
					.text(layout[d].info)
					.style("display","block")
				}

				if (d == 'data') {
					e = element_ui.append('div');

					table = e.append('table').style('width','100%')

					for (var dd in layout[d]) {
						if (layout[d][dd]==null){continue;}
						tr = table.append('tr')

						td = tr.append('td')
						// .style('width','100%')
						.attr('id',layout.id.info+'_td_'+layout[d][dd].name+counter)
						// .style('background-color','rgba(25,200,25,.75)')
						.text(layout[d][dd].name);
						// .style("display","block")

						if (layout[d][dd].elementType =='input') {
							//element_ui//.append('li')
							elementid = layout.id.info+'_input_'+layout[d][dd].name+counter;
							elementName = layout[d][dd].name;
							form_elements_id.push({id:elementid,name:elementName});
							

							td = tr.append('td')
							inputel = td.append('input')
							.attr('type',''+layout[d][dd].dataType)
							.attr('name',layout[d][dd].name)
							.attr('value',layout[d][dd].name)
							.attr('id',elementid)
							.style('width','100%')
							// .style('background-color','rgba(25,200,25,.75)')
							// .text(layout[d][dd].name+": ")
							// .style("position","relative")
							// .style('left','5%')
							// .style('width','100%')
							// console.log('view_dataType:'+layout[d][dd].dataType);
							if (layout[d][dd].dataType == 'text') {
								inputel.attr('value','');
							}
							if (layout[d][dd].dataType == 'number') {
								inputel.attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
							}
							if (layout[d][dd].dataType == 'password') {
								inputel.attr('type','password');
							}
							if (layout[d][dd].dataType == 'button') {
								d3.select("#"+layout.id.info+"_td_"+layout[d][dd].name+counter).html('');
							}
							if (layout[d][dd].dataType == 'image') {
								inputel.attr('src','./image/okbtn.gif')
								.style('width','128px')
								.style('height','128px');
							}
							if (layout[d][dd].dataType == 'checkbox' || layout[d][dd].dataType == 'radio') {
								d3.select("#"+layout.id.info+"_td_"+layout[d][dd].name+counter).html('');
								inputel.style('width','20px')
								td.append('label')
								.attr("for",layout.id.info+'_input_'+layout[d][dd].name+counter)
								.text(layout[d][dd].name);
							}
						}


						if (layout[d][dd].elementType=='select') {
								elementid = layout.id.info+'_select_'+layout[d][dd].name+counter;
								elementName = layout[d][dd].name;
								form_elements_id.push({id:elementid,name:elementName});
								// elements_id.push({id:elementid,name:elementName});
								// elements_id.push(layout.id.info+'_select_'+layout[d][dd].name+counter);
								td = tr.append('td')
								ss = td.append(layout[d][dd].elementType)
								.attr('name',dd)
								.attr('id',elementid)
								.style('width','100%')
								.attr('class','btn btn-default')
								.on('change',function(){
									layout['data'][''+this.name].dataType = this.value;
									console.log(this.value);
									console.log(this.name);
									console.log(layout['data'][''+this.name]);
								});
								infos = [];
								info = layout[d][dd].info;
								if (info!=undefined) {
									infos = info.split(",");
								}
								ss.selectAll("option").data(infos).enter()
								.append('option')
								.attr('value',function(m){return m;})
								.html(function(m){return m;})

								
								// ss.selectAll("option").each(function(m){
								// 	if (m === layout[d][dd].dataType) {
								// 		return d3.select(this).attr("selected", "selected");
								// 	}
								// });
								// .attr('value',layout[d][dd].info)
								// .html(layout[d][dd].info);
							}



						
					}

					submit_ui = e.append('button')
					.attr('name',count)
					.attr('id','submit_button'+count)
					.attr('onclick','submitClick()')
					.html('Submit')
					// .style("position","absolute")
					// .style("margin",marginpx+'px')
					// .style('left','22%')
					// .style('bottom','5px')
					.on('click',function(d){
						// $("#"+layout.id.info+counter+'view' ).hide();
						// console.log(this.name);
						// console.log(elements_id);
						var elements_data = elements_id[this.name].data;
						

						var result = "submit: ?";
						for (var s in elements_data) {
							// console.log(elements_data[s]);
							elname = elements_data[s].name;
							elvalue = $('#'+elements_data[s].id).val();
							result += elname+"="+elvalue
							if (s < elements_data.length-1){result +="&";}
						}
						alert(result);
					});

					view_ui.append('button')
					.html('X')
					.style("position","absolute")
					.style("margin",marginpx+'px')
					.style('right','2%')
					.style('top','5px')
					.on('click',function(d){
						$("#"+layout.id.info+counter+'view' ).hide();
						// $("#"+layout.id.info+counter+'view' ).remove();
					});

					var tools_ui = view_ui.append("button")
					.html('Export HTML')
					.attr('name',count)
					.style("position","absolute")
					.style("margin",marginpx+'px')
					.style('right','7%')
					.style('bottom','15px')
					.on('click',function(d){
						var heads = '<!DOCTYPE html><html><head><title>'+layout.title.info+'</title></head><body>'
						var javascript = '<script>'+elements_id[this.name].code+'</script>';
						var content = $("#"+layout.id.info+counter+'_model_ui' ).html();
						var footer = '</body></html>';
						var data = heads+javascript+content+footer;
						// console.log(data);
						saveDataAsFile(data,layout.id.info+counter+'view'+'.html');
					});
					count++;
				}
			}

			var index = counter-2;
			console.log('index:'+index);
			elements_id.push({id:index,data:form_elements_id,code:''});


			var elements_data = elements_id[index].data
			var json_data = JSON.stringify(elements_data);
			// console.log(json_data);
			
			//'submit_button'+count
			javascript_code = 'var elements='+json_data+';';
			javascript_code +='function submitClick() \
				{ \
					var result = "submit: ?"; \
				    for (var e in elements) { \
				    	var eid = elements[e].id; \
				    	var elname = elements[e].name; \
				    	var elvalue = document.getElementById(eid).value; \
				    	result += elname+"="+elvalue; \
						if (e < elements.length-1){result +="&";} \
				    } \
				    alert(result); \
				}';

			elements_id[index].code = javascript_code;


			form_elements_id=[];
			javascript_code="";
	
			$("#"+layout.id.info+counter+'view' ).draggable({
				start:	function() { $(this).css({'z-index': topzindex}); }, 
                stop: function() { $(this).css({'z-index': ++zindex}); } 
			});
			console.log("Function : show"+div);
		},
		hide: function() {
			console.log("Function : hide");
			$("#"+layout.id.info+counter+'view' ).hide();
		}
	}
});

