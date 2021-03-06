import { Observable } from 'rxjs/Observable';
import { AppInfo } from '../../tasks/model/app-info';
import { Page } from '../../shared/model/page';
import { AppRegistration } from '../../shared/model/app-registration.model';
import { TaskExecution } from '../../tasks/model/task-execution';
import { TaskDefinition } from '../../tasks/model/task-definition';
import { ListDefaultParams, OrderParams } from '../../shared/components/shared.interface';
import { TaskSchedule } from '../../tasks/model/task-schedule';
import {
  TaskListParams
} from '../../tasks/components/tasks.interface';

/**
 * Mock for TasksService.
 *
 * Create a mocked service:
 * const tasksService = new MockTasksService();
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: TasksService, useValue: tasksService }
 *   ]
 * }).compileComponents();
 *
 * Set app infos:
 * tasksService.testAppInfos = { faketask: {name: 'fakename'}};
 *
 * Set app registrations:
 * tasksService.testTaskAppRegistrations = [
 *   new AppRegistration('fakename', ApplicationType.task, 'fakeuri')
 * ];
 *
 * @author Janne Valkealahti
 */
export class MockTasksService {

  public tasksContext = {
    q: '',
    page: 0,
    size: 20,
    sort: 'DEFINITION_NAME',
    order: OrderParams.ASC,
    itemsSelected: [],
    itemsExpanded: []
  };

  public executionsContext = {
    q: '',
    page: 0,
    size: 10,
    sort: 'TASK_EXECUTION_ID',
    order: OrderParams.DESC,
    itemsSelected: [],
    itemsExpanded: []
  };

  public schedulesContext = {
    q: '',
    page: 0,
    size: 30,
    sort: 'SCHEDULE_NAME',
    order: OrderParams.DESC,
    itemsSelected: []
  };

  private _testAppInfos: {};
  private _testTaskAppRegistrations: AppRegistration[];
  private _testExecutionDetails: {};

  public _taskDefinitions;
  public _taskSchedules;
  public _taskExecutions;

  get taskDefinitions(): any {
    return this._taskDefinitions;
  }

  set taskDefinitions(value: any) {
    this._taskDefinitions = value;
  }

  get taskExecutions(): any {
    return this._taskExecutions;
  }

  set taskExecutions(value: any) {
    this._taskExecutions = value;
  }

  get taskSchedules(): any {
    return this._taskSchedules;
  }

  set taskSchedules(value: any) {
    this._taskSchedules = value;
  }

  get testAppInfos() {
    return this._testAppInfos;
  }

  set testAppInfos(params: any) {
    this._testAppInfos = params;
  }

  get testTaskAppRegistrations() {
    return this._testTaskAppRegistrations;
  }

  set testTaskAppRegistrations(params: any) {
    this._testTaskAppRegistrations = params;
  }

  get testExecutionDetails() {
    return this._testExecutionDetails;
  }

  set testExecutionDetails(params: any) {
    this._testExecutionDetails = params;
  }

  getAppInfo(id: string): Observable<AppInfo> {
    const appInfo = new AppInfo();
    appInfo.name = this.testAppInfos[id].name;
    // TODO: polish related pojos for not need for this check
    if (this.testAppInfos[id].options) {
      appInfo.options = this.testAppInfos[id].options;
    }
    return Observable.of(appInfo);
  }

  getTaskAppRegistrations(): Observable<Page<AppRegistration>> {
    const p = new Page<AppRegistration>();
    this._testTaskAppRegistrations.forEach(r => {
      p.items.push(new AppRegistration(r.name, r.type, r.uri));
    });
    return Observable.of(p);
  }

  createDefinition(definition: string, name: string) {
    // TODO: when needed in tests return something useful
    return Observable.of({});
  }

  getExecution(id: string): Observable<TaskExecution> {
    return Observable.of(this.testExecutionDetails[id]);
  }

  destroyDefinition(taskDefinition: TaskDefinition): Observable<Response> | Observable<any> {
    return Observable.of({});
  }

  destroyDefinitions(taskDefinitions: TaskDefinition[]): Observable<Response> | Observable<any> {
    return Observable.of(Array.from({ length: taskDefinitions.length }));
  }

  getExecutions(): Observable<Page<TaskExecution>> {
    const page = new Page<TaskExecution>();
    if (this.taskExecutions) {
      const response = this.taskExecutions;
      let items: TaskExecution[];
      if (response._embedded && response._embedded.taskExecutionResourceList) {
        items = response._embedded.taskExecutionResourceList as TaskExecution[];
      } else {
        items = [];
      }
      page.items = items;
      page.totalElements = response.page.totalElements;
      page.totalPages = response.page.totalPages;
      page.pageNumber = response.page.number;
      page.pageSize = response.page.size;
    }
    return Observable.of(page);
  }

  getDefinitions(): Observable<Page<TaskDefinition>> {
    const page = new Page<TaskDefinition>();
    if (this.taskDefinitions) {
      const response = this.taskDefinitions;
      let items: TaskDefinition[];
      if (response._embedded && response._embedded.taskDefinitionResourceList) {
        items = response._embedded.taskDefinitionResourceList as TaskDefinition[];
      } else {
        items = [];
      }
      page.items = items;
      page.totalElements = response.page.totalElements;
      page.totalPages = response.page.totalPages;
      page.pageNumber = response.page.number;
      page.pageSize = response.page.size;
    }
    return Observable.of(page);
  }

  getSchedules(taskListParams: TaskListParams): Observable<Page<TaskSchedule>> {
    const page = new Page<TaskSchedule>();
    if (this.taskSchedules) {
      const response = this.taskSchedules;
      let items: TaskSchedule[];
      if (response._embedded && response._embedded.taskScheduleResourceList) {
        items = response._embedded.taskScheduleResourceList as TaskSchedule[];
      } else {
        items = [];
      }
      page.items = items;
      page.totalElements = response.page.totalElements;
      page.totalPages = response.page.totalPages;
      page.pageNumber = response.page.number;
      page.pageSize = response.page.size;
    }
    return Observable.of(page);
  }

  getScheduleByTask(taskScheduleListParams: ListDefaultParams): Observable<Page<TaskSchedule>> {
    const page = new Page<TaskSchedule>();
    if (this.taskSchedules) {
      const response = this.taskSchedules;
      let items: TaskSchedule[];
      if (response._embedded && response._embedded.taskScheduleResourceList) {
        items = response._embedded.taskScheduleResourceList as TaskSchedule[];
      } else {
        items = [];
      }
      page.items = items;
      page.totalElements = response.page.totalElements;
      page.totalPages = response.page.totalPages;
      page.pageNumber = response.page.number;
      page.pageSize = response.page.size;
    }
    return Observable.of(page);
  }

  getSchedule(scheduleName: string): Observable<TaskSchedule> {
    return Observable.of(this.taskSchedules._embedded.taskScheduleResourceList[0]);
  }

  getDefinition(name: string): Observable<any> {
    return Observable.of(this.taskDefinitions._embedded.taskDefinitionResourceList[0]);
  }

  destroySchedule(taskSchedules: TaskSchedule): Observable<any> {
    return Observable.of({});
  }

  destroySchedules(taskSchedules: TaskSchedule[]): Observable<any> {
    return Observable.of(Array.from({ length: taskSchedules.length }));
  }

  getTaskExecutions(taskScheduleListParams: ListDefaultParams): Observable<Page<TaskExecution>> {
    return this.getExecutions();
  }

  createSchedules() {
    return Observable.of([{}]);
  }

}
