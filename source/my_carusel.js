/**
*
* Скрипт автокарусели
* @author	: Abdullaev Farrukh
* version	: 1.0.0
*
*/
$(function(){
	/* Основной контейнер */
	var container = $('.my_carusel_container ');
	/* Скорость перехода */
	var speed = 1000;
	/* Интервал задержки */
	var pause_interval = 2;
	/* Команда остановки автопереключения */
	var pause_loop = 0;
	/* Текущая позиция */
	var position = 0;
	/* Время автопереключения */
	var next_img_interval = 3000;

	/* Устанавливаем флаг задержки */
	var pause_flag = pause_interval;
	/* Количество изображений */
	var img_count = $('img', container).length;
	/* Извлекаем ширину */
	var container_width = container.attr('width') * 1;
	/* Извлекаем высоту */
	var container_height = container.attr('height') * 1;
	/* Определение позиции поледнего изображения */
	var last_img_position = container_width*(img_count-1)*(-1);

	/* Устанавливаем ширину и высоту видимого блока */
	container.css({ 
		'width'	: container_width + '.px',
		'height': container_height + '.px' 
	});

	/* Добавляем скрытый контейнер */
	var images = $('img', container);
	container.html(''); // Очищаем от всякого!
	container.append('<div class="my_carusel_content"></div>');
	$('.my_carusel_content').append(images);
	/* Устанавливаем ширину скрытый контент */
	$('.my_carusel_content').css({ 'width' : container_width*img_count + '.px' });
	
	/* Добавляем управляющие стрелки */
	container.append('<div class="my_carusel_arrow my_carusel_left-arrow">←</div>');
	container.append('<div class="my_carusel_arrow my_carusel_right-arrow">→</div>');
	/* Позицианируем стрелки вертикально по центру */
	$('.my_carusel_arrow').css({ 'top' : (container_height/2 - 20) + '.px' });
	/* Анимация стрелок */
	$('.my_carusel_arrow').on('mouseleave', function(){ $(this).animate({ 'opacity' : 0.3 }) });
	$('.my_carusel_arrow').on('mouseenter', function(){ $(this).animate({ 'opacity' : 1 }) });

	/* Устанавливаем ширину и высоту изображений */
	$('.my_carusel_content img').css({ 
		'width'	: container_width + '.px',
		'height': container_height + '.px' 
	});
	/* Переключаем изображение */
	function set_img(){
		$('.my_carusel_content').animate({ 'left' : position+'px' }, speed, 'swing');
	}
	/* Следующее изображение */
	function next_img(){
		position -= container_width;
		if(position < last_img_position) position = 0;
		set_img();
	}
	/* Предыдущее изображение */
	function prev_img(){
		position += container_width;
		if(position > 0) position = last_img_position;
		set_img();
	}
	/* Останавливаем автопереключатель */
	function stop_looping(){
		pause_flag = pause_loop;
	}

	/* Действия при нажатии стрелок */
	$('.my_carusel_left-arrow').on('click', function(){
		stop_looping();
		prev_img();
	});
	$('.my_carusel_right-arrow').on('click', function(){
		stop_looping();
		next_img();
	});

	/* Автопереходы */
	setInterval(function(){
		if(pause_flag < pause_interval){
			pause_flag++;
			return;
		}
		next_img();
		
	}, next_img_interval);
});