# Проект «Readme»

## Запуск проекта

```
npx nx run auth:serve
```

## Создание темплейта для микросервиса (Nest application)

```
npx nx g @nx/nest:application <ИмяПроекта>
```

## Создание нового модуля

```
nx generate @nx/nest:module app/blog-user --project=account
nx generate @nx/nest:module app/authentication --project=account
```

## Заготовки для Nest

Контроллер

```
nx generate @nx/nest:controller app/authentication --project=users
```

Сервис

```
nx generate @nx/nest:service app/authentication --project=users
```

## Создание библиотеки. О библиотека NX правильней думать как о месте, где также может быть реализовано логика приложения. (Node library)

```
nx generate @nx/node:library <ИмяБиблиотеки>
```

## После описания первой модели, мы можем её проверить её на корректность, или проще сказать: пролинтерить. Для этого выполним команду:

```
npx prisma format --schema ./shared/blog/models/prisma/schema.prisma
```

npx prisma migrate dev \
--name "Correct models" \
--schema ./libs/shared/blogs/models/prisma/schema.prisma \
--skip-generate

## Валидация схемы blogs

npx nx run blogs:db:lint
