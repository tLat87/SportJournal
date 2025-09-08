// Утилиты для управления онбордингом

// Функция для сброса онбординга (для тестирования)
export const resetOnboarding = () => {
  // Поскольку теперь онбординг показывается каждый раз,
  // эта функция не нужна, но оставляем для совместимости
  console.log('Onboarding will show on next app restart');
};

// Функция для проверки, нужно ли показать онбординг
export const shouldShowOnboarding = (): boolean => {
  // Теперь онбординг показывается каждый раз
  return true;
};

// Функция для принудительного показа онбординга
export const forceShowOnboarding = () => {
  // Перезапустите приложение, чтобы увидеть онбординг
  console.log('Restart the app to see onboarding');
};