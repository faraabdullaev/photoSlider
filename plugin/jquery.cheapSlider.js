/**
*
* Простой слайдер 
* ( тольео для изображений )
* @author	: Abdullaev Farrukh
* @date		: 20.11.2014
* @version	: 1.0.0
*
*/
(function($){
jQuery.fn.cheapSlider = function( options ){
	/** ------ МАССИВ С НАСТРОЙКАМИ ------ */
	options = $.extend({
		/* Ширина контейнера */
		width				: 1024,
		/* Высота контейнера */
		height				: 600,
		/* Скорость перехода */
		speed				: 1000,
		/* Интервал задержки */
		pause_interval		: 2,
		/* Время автопереключения */
		next_img_interval	: 3000,
		/* Идинтификатор стрелки "предыдущее изоб." */
		prev				: 'prev',
		/* Идинтификатор стрелки "следующее изоб." */
		next				: 'next'
	}, options);

	/** ------ СИСТЕМНЫЕ ПЕРЕМЕННЫЕ ------ */
	/* Основной контейнер */
	var container = $(this);
	/* Устанавливаем флаг задержки */
	var pause_flag = options.pause_interval;
	/* Количество изображений */
	var img_count = $('img', container).length;
	/* Извлекаем ширину */
	var container_width = options.width;//container.attr('width') * 1;
	/* Извлекаем высоту */
	var container_height = options.height//container.attr('height') * 1;
	/* Определение позиции поледнего изображения */
	var last_img_position = container_width*(img_count-1)*(-1);
	/* Текущая позиция */
	var position = 0;
	/* Команда остановки автопереключения */
	var pause_loop = 0;
	
	/* Запускаем слайдер */
	run = function(){
		var images = $('img', container);
		container
			/* Устанавливаем ширину и высоту видимого блока */
			.css({ 
				'width'		: container_width + '.px',
				'height'	: container_height + '.px',
				'position'	: 'relative',
				'overflow'	: 'hidden'
			})
			/* Очищаем */
			.html('')
			/* Добавляем скрытый контейнер */
			.append('<div></div>')
			/* Устанавливаем ширину скрытого контейнера */
			.find('div')
			.css({
				'width' 	: container_width*img_count + '.px',
				'float'		: 'left',
				'position'	: 'relative',
				'overflow'	: 'hidden'
			})
			/* Добавляем изображения в скрытый контейнер */
			.append(images)
			/* Устанавливаем ширину и высоту изображений */
			.find('img')
			.css({ 
				'width'	: container_width + '.px',
				'height': container_height + '.px' 
			});
		/* Добавляем управляющие стрелки */
		container
			.append('<span id="'+ options.prev +'">←</span>')
			.append('<span id="'+ options.next +'">→</span>')
			/* Позицианируем стрелки вертикально по центру */
			.find('span')
			.css({
				'top'			: (container_height/2 - 20) + '.px',
				'color'			: '#fff',
				'position'		: 'absolute',
				'padding'		: '13px',
				'margin'		: '3px',
				'background'	: '#ccc',
				'border-radius'	: '7px',
				'opacity'		: '0.3',
				'width'			: '20px',
				'text-align'	: 'center',
				'display'		: 'inline-block',
				'cursor'		: 'pointer'				
			})
			/* Анимация стрелок */
			.on('mouseleave', function(){ $(this).animate({ 'opacity' : 0.3 }) })
			.on('mouseenter', function(){ $(this).animate({ 'opacity' : 1 }) })
			/* Действия при нажатии стрелок */
			.on('click', function(){ 
				( $(this).attr('id') === options.prev ) ? prev_img() : next_img();
				set_img();
				/* Останавливаем автопереключатель */
				pause_flag = pause_loop;
			});
		container.find('#'+options.next).css('right', '20px');
		container.find('#'+options.prev).css('left', '20px');
		
		/* Автопереходы */
		setInterval(function(){
			if(pause_flag < options.pause_interval){
				pause_flag++;
				return;
			}
			next_img();
			set_img();
			
		}, options.next_img_interval);
	};

	/* Переключаем изображение */
	function set_img(){
		container
			.find('div')
			.animate({ 'left' : position+'px' }, options.speed, 'swing');
	}
	/* Следующее изображение */
	function next_img(){
		position -= container_width;
		if(position < last_img_position) position = 0;
	}
	/* Предыдущее изображение */
	function prev_img(){
		position += container_width;
		if(position > 0) position = last_img_position;
	}

	return this.each(run);
};
})(jQuery);