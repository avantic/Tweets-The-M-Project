
Tweets.ControllerUtils = M.Object.extend({
	
	type: 'Tweets.ControllerUtils',
	
	
	/**
	 * Crea un JSON con el formato para un listado dividido:
	 * 
	 * { 
	 *    "headA": [{"property1" : "valuePropertyA1",
	 *    			 "property2" : "valuePropertyA2"
	 *    			},
	 *    			...
	 *    		   ],
	 *    "headB": [{"property1" : "valuePropertyB1",
	 *    			 "property2" : "valuePropertyB2"
	 *    			},
	 *    			...
	 *    		   ],
	 *    ...
	 * }
	 * 
	 * @param model
	 * @param formatHeader: callback que retorna un string con el contenido formateado del item con el estilo de divisor
	 * @param getProperties: callback que devuelve un array de objetos, con las propiedades relativas a los items hijos del divisor
	 * 
	 * @return dividedListJSON
	 * 
	 */
	createDividedListJSON: function(model, formatHeader, getProperties) {
		
		var dividedListJSON = {};
		
		for (i in model) {
			var id = model[i].m_id;
			var head = formatHeader(model[i], id);
			var properties = getProperties(model[i]);
			for (j in properties)
				properties[j].id = id;
			
			dividedListJSON[head] = properties;
		}
		
		return dividedListJSON;
	}

});