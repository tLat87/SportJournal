# Настройка изображений онбординга

## Как добавить изображения

### Вариант 1: Локальные изображения (рекомендуется)

1. Создайте папку `src/assets/images/` в проекте
2. Добавьте ваши изображения:
   - `onboarding1.jpg` - для первого экрана "Record your path"
   - `onboarding2.jpg` - для второго экрана "Add moments"  
   - `onboarding3.jpg` - для третьего экрана "Track your progress"

3. Обновите файл `src/constants/images.ts`:

```typescript
export const OnboardingImages = {
  screen1: require('../assets/images/onboarding1.jpg'),
  screen2: require('../assets/images/onboarding2.jpg'),
  screen3: require('../assets/images/onboarding3.jpg'),
};
```

### Вариант 2: URL изображений

Обновите файл `src/constants/images.ts`:

```typescript
export const OnboardingImages = {
  screen1: 'https://your-domain.com/images/onboarding1.jpg',
  screen2: 'https://your-domain.com/images/onboarding2.jpg',
  screen3: 'https://your-domain.com/images/onboarding3.jpg',
};
```

## Рекомендации по изображениям

- **Размер**: 800x600px или больше
- **Формат**: JPG или PNG
- **Стиль**: Темные, монохромные изображения с неоновыми зелеными акцентами
- **Содержание**: 
  - Экран 1: Спортсмен в движении + журнал/записи
  - Экран 2: Спортсмен + фотографии моментов тренировок
  - Экран 3: Спортсмен + графики прогресса

## Тестирование

Для тестирования онбординга используйте функцию сброса:

```typescript
import { resetOnboarding } from './src/utils/onboardingUtils';

// Вызовите эту функцию для сброса онбординга
resetOnboarding();
```

## Структура онбординга

1. **Экран 1**: "Record your path" - запись активности
2. **Экран 2**: "Add moments" - добавление фотографий
3. **Экран 3**: "Track your progress" - отслеживание прогресса

Каждый экран имеет:
- Кнопку "Skip" в правом верхнем углу
- Навигационные стрелки внизу
- Индикаторы прогресса (точки)
- Адаптивный дизайн для разных размеров экранов


