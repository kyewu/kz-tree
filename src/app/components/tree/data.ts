export const DATA = [
  {
    id: 1,
    parentId: 0,
    displayName: 'sprintBoot3.2',
    recipeName: 'org.openrewrite.java.spring.boot3.UpgradeSpringBoot_3_2',
    description: 'Upgrade to Spring Boot 3.2',
    createdDate: '2021-10-20T00:00:00.000Z',
    createdBy: 'admin',
    modificationDate: '2021-10-20T00:00:00.000Z',
    modifiedBy: 'admin',
    active: true,
    topLevel: true, 
    recipe: false,
    children: [
      {
        id: 2,
        parentId: 1,
        displayName: 'JDK',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: false,
        children: [
          {
            id: 3,
            parentId: 2,
            displayName: 'JDK17',
            recipeName: null,
            description: null,
            createdDate: '2021-10-20T00:00:00.000Z',
            createdBy: 'admin',
            modificationDate: '2021-10-20T00:00:00.000Z',
            modifiedBy: 'admin',
            active: true,
            topLevel: false,
            recipe: true,
            children: []
          },
          {
            id: 4,
            parentId: 2,
            displayName: 'JDK21',
            recipeName: null,
            description: null,
            createdDate: '2021-10-20T00:00:00.000Z',
            createdBy: 'admin',
            modificationDate: '2021-10-20T00:00:00.000Z',
            modifiedBy: 'admin',
            active: true,
            topLevel: false,
            recipe: true,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    parentId: 1,
    displayName: 'JDK',
    recipeName: null,
    description: null,
    createdDate: '2021-10-20T00:00:00.000Z',
    createdBy: 'admin',
    modificationDate: '2021-10-20T00:00:00.000Z',
    modifiedBy: 'admin',
    active: true,
    topLevel: false,
    recipe: false,
    children: [
      {
        id: 3,
        parentId: 2,
        displayName: 'JDK17',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: true,
        children: []
      },
      {
        id: 4,
        parentId: 2,
        displayName: 'JDK21',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: true,
        children: []
      },
      {
        id: 5,
        parentId: 2,
        displayName: 'JDK22',
        recipeName: null,
        description: null,
        createdDate: '2021-10-20T00:00:00.000Z',
        createdBy: 'admin',
        modificationDate: '2021-10-20T00:00:00.000Z',
        modifiedBy: 'admin',
        active: true,
        topLevel: false,
        recipe: true,
        children: []
      }
    ]
  }
]