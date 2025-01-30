import type { Project } from "./projects.types.ts"

export const projects: Project[] = [
  {
    id: 1,
    name: "project1",
    tasks: [
      {
        id: 1,
        title: "Разработка функционала фильтрации",
        description:
          "Разработка фильтрации по категориям на странице продуктов.",
        createdDate: "2025-01-01",
        timeInProgress: "2 дня",
        endDate: "2025-01-05",
        priority: "high",
        files: [
          {
            id: 1,
            name: "technical_spec.pdf",
            url: "",
          },
          {
            id: 2,
            name: "design_mockup.png",
            url: "",
          },
        ],
        currentStatus: "development",
        subTasks: [
          {
            id: 2,
            title: "Создание UI для фильтрации",
            description: "Создать интерфейс для выбора фильтров.",
            createdDate: "2025-01-01",
            timeInProgress: "1 день",
            endDate: "2025-01-02",
            priority: "medium",
            files: [],
            currentStatus: "done",
            subTasks: [],
            comments: [],
          },
          {
            id: 3,
            title: "Написание логики фильтрации",
            description: "Разработка логики фильтрации данных на сервере.",
            createdDate: "2025-01-01",
            timeInProgress: "2 дня",
            endDate: "2025-01-03",
            priority: "high",
            files: [],
            currentStatus: "development",
            subTasks: [],
            comments: [],
          },
        ],
        comments: [
          {
            id: 1,
            text: "Можно сделать фильтрацию по нескольким категориям?",
            date: "2025-01-02",
            author: "Иван Иванов",
            replies: [
              {
                id: 2,
                text: "Да, это будет реализовано через чекбоксы.",
                date: "2025-01-03",
                author: "Алексей Смирнов",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Исправление бага с отображением на мобильных устройствах",
        description:
          "На мобильных устройствах кнопки не отображаются корректно.",
        createdDate: "2025-01-04",
        timeInProgress: "1 день",
        endDate: "2025-01-05",
        priority: "high",
        files: [],
        currentStatus: "development",
        subTasks: [],
        comments: [
          {
            id: 1,
            text: "Будет ли исправлен баг на всех мобильных браузерах?",
            date: "2025-01-04",
            author: "Мария Петрова",
            replies: [],
          },
        ],
      },
      {
        id: 3,
        title: "Разработка страницы профиля пользователя",
        description:
          "Разработать страницу для отображения профиля пользователя.",
        createdDate: "2025-01-01",
        timeInProgress: "1 неделя",
        endDate: "2025-01-07",
        priority: "medium",
        files: [
          {
            id: 1,
            name: "profile_design.png",
            url: "",
          },
        ],
        currentStatus: "done",
        subTasks: [],
        comments: [],
      },
      {
        id: 4,
        title: "Подготовка отчета по проекту",
        description:
          "Необходимо подготовить отчет по текущему состоянию проекта для руководства.",
        createdDate: "2025-01-10",
        timeInProgress: "2 дня",
        endDate: "2025-01-12",
        priority: "medium",
        files: [
          {
            id: 1,
            name: "project_report_template.docx",
            url: "",
          },
        ],
        currentStatus: "queue",
        subTasks: [],
        comments: [
          {
            id: 1,
            text: "Какой формат отчета требуется?",
            date: "2025-01-10",
            author: "Дмитрий Сидоров",
            replies: [
              {
                id: 2,
                text: "Отчет должен быть в формате PDF и содержать графики по меткам.",
                date: "2025-01-10",
                author: "Екатерина Гусева",
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Разработка документации по API",
        description: "Создание документации для API проекта.",
        createdDate: "2025-01-15",
        timeInProgress: "4 дня",
        endDate: "2025-01-19",
        priority: "low",
        files: [
          {
            id: 1,
            name: "api_documentation_template.md",
            url: "",
          },
        ],
        currentStatus: "development",
        subTasks: [],
        comments: [],
      },
      {
        id: 6,
        title: "Разработка документации по API",
        description: "Создание документации для API проекта.",
        createdDate: "2025-01-15",
        timeInProgress: "4 дня",
        endDate: "2025-01-19",
        priority: "low",
        files: [
          {
            id: 1,
            name: "api_documentation_template.md",
            url: "",
          },
        ],
        currentStatus: "done",
        subTasks: [],
        comments: [],
      },
    ],
  },
  {
    id: 2,
    name: "project2",
    tasks: [],
  },
  {
    id: 3,
    name: "project3",
    tasks: [],
  },
]
