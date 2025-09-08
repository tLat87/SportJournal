# Настройка смайликов и анимаций

## ✅ Что уже сделано

### 🎭 **Смайлики заменены везде**:
- **Навигация**: 🏠🏡 (Home), 📖📗 (Journal), 📊📈 (Stats)
- **HomeScreen**: 💡 (лампочка), 🏃‍♂️ (бегун), ➕ (добавить), 🚶‍♂️ (декоративный), 👤 (пользователь), ▶️ (стрелка)
- **AddEntryScreen**: 📷 (камера), ➕ (добавить)
- **JournalScreen**: 📤 (поделиться), 🗑️ (удалить), 📖 (журнал), 👤 (пользователь)
- **OnboardingScreen**: ◀️▶️ (навигация)

### 🎬 **Анимации добавлены**:
- **AnimatedView компонент** с 7 типами анимаций:
  - `fadeIn` - плавное появление
  - `fadeInDown` - появление сверху
  - `fadeInUp` - появление снизу
  - `slideInLeft` - появление слева
  - `slideInRight` - появление справа
  - `zoomIn` - масштабирование
  - `bounceIn` - подпрыгивание

- **Анимации по экранам**:
  - **HomeScreen**: Последовательные анимации с задержками
  - **AddEntryScreen**: Анимации для каждого поля формы
  - **OnboardingScreen**: Анимации для изображений и текста

## 🎨 **Как заменить смайлики на PNG изображения**

### 1. Создайте папку для изображений
```bash
mkdir src/assets/images
```

### 2. Добавьте ваши PNG файлы
```
src/assets/images/
├── home-active.png
├── home-inactive.png
├── journal-active.png
├── journal-inactive.png
├── stats-active.png
├── stats-inactive.png
├── lightbulb.png
├── runner.png
├── add.png
├── share.png
├── delete.png
├── user.png
├── camera.png
└── chevron.png
```

### 3. Создайте компонент для изображений
```typescript
// src/components/EmojiImage.tsx
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface EmojiImageProps {
  source: ImageSourcePropType;
  size?: number;
  style?: any;
}

const EmojiImage: React.FC<EmojiImageProps> = ({ source, size = 24, style }) => {
  return (
    <Image 
      source={source} 
      style={[styles.image, { width: size, height: size }, style]} 
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    tintColor: '#00FF88', // Неоновый зеленый цвет
  },
});

export default EmojiImage;
```

### 4. Замените смайлики на изображения
```typescript
// Пример замены в HomeScreen
import EmojiImage from '../components/EmojiImage';

// Вместо:
<Text style={styles.emojiIcon}>💡</Text>

// Используйте:
<EmojiImage source={require('../assets/images/lightbulb.png')} size={24} />
```

## 🎬 **Настройка анимаций**

### Добавление новых анимаций
```typescript
// В AnimatedView.tsx добавьте новые типы анимаций
export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInDown' 
  | 'fadeInUp' 
  | 'slideInLeft' 
  | 'slideInRight' 
  | 'zoomIn' 
  | 'bounceIn'
  | 'rotateIn'      // Новая анимация
  | 'pulse';        // Новая анимация
```

### Настройка задержек анимаций
```typescript
// Примеры использования с разными задержками
<AnimatedView animation="fadeIn" delay={0}>
  <Text>Появляется сразу</Text>
</AnimatedView>

<AnimatedView animation="fadeInUp" delay={200}>
  <Text>Появляется через 200мс</Text>
</AnimatedView>

<AnimatedView animation="bounceIn" delay={400} spring={true}>
  <Text>Подпрыгивает через 400мс с пружинным эффектом</Text>
</AnimatedView>
```

## 🎯 **Рекомендации по дизайну**

### Размеры изображений
- **Навигация**: 24x24px
- **Кнопки**: 20-40px
- **Декоративные**: 16-32px
- **Большие иконки**: 60-80px

### Цветовая схема
- **Активные элементы**: #00FF88 (неоновый зеленый)
- **Неактивные элементы**: #888888 (серый)
- **Ошибки**: #FF4444 (красный)
- **Фон**: #1A1A1A (темный)

### Анимации
- **Быстрые действия**: 200-300мс
- **Переходы**: 400-600мс
- **Сложные анимации**: 800-1000мс
- **Пружинные эффекты**: для кнопок и важных элементов

## 🚀 **Готово к использованию**

Приложение полностью готово с:
- ✅ Смайликами вместо иконок
- ✅ Плавными анимациями
- ✅ Темной темой с неоновыми акцентами
- ✅ Онбордингом
- ✅ Полным функционалом журнала

Просто замените смайлики на ваши PNG изображения по инструкции выше!

