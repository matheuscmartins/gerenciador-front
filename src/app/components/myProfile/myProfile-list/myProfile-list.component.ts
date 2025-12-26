import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { Address } from 'src/app/models/address';
import { MemberService } from 'src/app/services/member.service';
import { AddressService } from 'src/app/services/address.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeadQuarter } from 'src/app/models/headQuarter';
import { HeadQuarterService } from 'src/app/services/headQuarter.service';
import { DateAdapter } from '@angular/material/core';
import { BloodTypeService } from 'src/app/services/bloodType.service';
import { BloodType } from 'src/app/models/bloodType';
import { AuthService } from 'src/app/services/auth.service';
import { TravelControl } from 'src/app/models/travelControl';
import { TravelControlService } from 'src/app/services/travelControl.service';
import { InfractionService } from 'src/app/services/infraction.service';
import { Infraction } from 'src/app/models/infraction';
import { MemberPatch } from 'src/app/models/memberPatch';
import { MemberPatchService } from 'src/app/services/memberPatch.service';

@Component({
  selector: 'app-myProfile-list',
  templateUrl: './myProfile-list.component.html',
  styleUrls: ['./myProfile-list.component.css']
})
export class MyProfileListComponent implements OnInit {
  
  // FOTO DE PERFIL  
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  defaultProfileImage = 'assets/img/noProfile.png';

  ELEMENT_DATA_Adress: Address[] = [] 
  ELEMENT_DATA_HeadQuarter: HeadQuarter[] = [] 
  ELEMENT_DATA_INFRACTION: Infraction[] = [] 
  ELEMENT_DATA_TRAVELCONTROL: TravelControl[] = []
  ELEMENT_DATA_MEMBERPATCH: MemberPatch[] = []
  
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatPaginator) paginatorMemberPatch: MatPaginator;  
  @ViewChild(MatPaginator) paginatorTravel: MatPaginator;
  
  member: Member = {
    id:'',
    firstName: '',
    lastName: '',
    nickName:  '',
    rg:  '',
    cpf:  '',
    cnh:  '',
    celPhone:  '',
    phone:  '',
    familiarPhone1:  '',
    familiarPhone2:  '',
    email:  '',
    password:  '',
    birthDate:  '',
    admissionDate:  '',
    shutdowDate:  '',    
    imagePath: '',  // ← JÁ EXISTE
    profile: [],
    headQuarter: {      
     },
    bloodType: {
      description: ''
    }
  }  
  
  //Member fields
  firstName: FormControl = new FormControl(null, Validators.minLength(4)); 
  lastName: FormControl = new FormControl(null, Validators.minLength(4));  
  nickName: FormControl = new FormControl(null, Validators.minLength(4));  
  rg: FormControl = new FormControl(null, Validators.minLength(4));  
  cpf: FormControl = new FormControl(null, Validators.minLength(4)); 
  cnh: FormControl = new FormControl(null, Validators.minLength(4));   
  celPhone: FormControl = new FormControl(null, Validators.minLength(4));  
  phone: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone1: FormControl = new FormControl(null, Validators.minLength(4));  
  familiarPhone2: FormControl = new FormControl(null, Validators.minLength(4)); 
  birthDateForm:  FormControl = new FormControl(null);
  bloodTypeMatSelected: FormControl = new FormControl(null); 
  bloodTypeList: BloodType [];
  birthDateStart: Date;
  panelPersonalOpen = false;
  
  //Adress fields
  displayedColumnsAddress: string[] = ['position', 'logradouro', 'number', 'city', 'cep','acoes'];
  dataSourceAddress = new MatTableDataSource<Address>(this.ELEMENT_DATA_Adress);  
  addressLogradouro: FormControl = new FormControl(null, Validators.required);
  addressPostCode: FormControl = new FormControl(null, Validators.required);      
  cityName: FormControl = new FormControl(null, Validators.required); 
  panelAdressOpen = false;   

  //HeadQuarter fields
  headQuarterDescription: FormControl = new FormControl(null, Validators.required);
  displayedColumnsHeadQuarter: string[] = ['position', 'description', 'city'];
  dataSourceHeadQuarter = new MatTableDataSource<HeadQuarter>(this.ELEMENT_DATA_HeadQuarter);  
  headQuarterCity: FormControl = new FormControl(null, Validators.required);
  admissionDateForm: FormControl = new FormControl(null); 
  shutdowDateForm: FormControl = new FormControl(null);
  admissionDateStart: Date;
  shutdowDateStart: Date;
  panelHeadQuarterOpen = false;  
  
  //infraction fields
  panelInfractionOpen = false;
  displayedColumnsInfraction: string[] = ['position', 'name','infractionType', 'infractionDate', 'acoes'];
  dataSourceInfraction = new MatTableDataSource<Infraction>(this.ELEMENT_DATA_INFRACTION);
  showInfractionModal: boolean = false;
  selectedInfraction: Infraction | null = null;
  infractionTypes = {
    'Escrita': { icon: 'edit', color: '#3b82f6' },
    'Suspensão': { icon: 'block', color: '#f59e0b' },
    'Verbal': { icon: 'record_voice_over', color: '#10b981' },
    'Desligamento': { icon: 'exit_to_app', color: '#ef4444' },
    'Rebaixamento': { icon: 'trending_down', color: '#f97316' },
    'Expulsão': { icon: 'cancel', color: '#dc2626' }
  };

  // memberPatch fields
  panelMemberPatchOpen = false;
  displayedColumnsMemberPatch: string[] = ['position', 'name', 'memberName', 'admissionDate', 'acoes'];
  dataSourceMemberPatch = new MatTableDataSource<MemberPatch>(this.ELEMENT_DATA_MEMBERPATCH);  
  showMemberPatchModal: boolean = false;
  selectedMemberPatch: MemberPatch | null = null;

  //travels fields
  now = new Date();
  displayedColumnsTravel: string[] = ['position', 'travelDate', 'location',  'km', 'kmControl',  'acoes'];
  dataSourceTravel = new MatTableDataSource<TravelControl>(this.ELEMENT_DATA_TRAVELCONTROL);
  travelStartDateStart = new Date(this.now.getFullYear(), 0, 1);  
  travelEndDateStart: Date = new Date();
  travelStartDateForm: FormControl = new FormControl(this.travelStartDateStart); 
  travelEndDateForm: FormControl = new FormControl (this.travelEndDateStart);
  panelTravelsOpen = false;  
  showTravelModal: boolean = false;
  selectedTravel: TravelControl | null = null;

  //acess fields
  email: FormControl = new FormControl(null, Validators.minLength(4));  
  password: FormControl = new FormControl(null, Validators.minLength(4));    
  panelAccessOpen = false;
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmaSenha: string = '';

  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  senhaAtualControl: FormControl = new FormControl('', [Validators.required]);
  novaSenhaControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  confirmaSenhaControl: FormControl = new FormControl('', [Validators.required]);  

  constructor(
    private addressService: AddressService,
    private headQuarterService: HeadQuarterService,
    private memberService: MemberService,
    private infractionService: InfractionService,
    private bloodTypeService: BloodTypeService,
    private memberPatchService: MemberPatchService,
    private travelControlservice: TravelControlService,
    private toastr: ToastrService,
    private router: Router,
    public _adapter: DateAdapter<Date>,    
    private activedRoute : ActivatedRoute,
    fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this._adapter.setLocale('en-GB');
    this.member.id = this.activedRoute.snapshot.paramMap.get('id'); 
    this.findAllBloodType();
    this.bloodTypeMatSelected.disable();
    this.findbyId(); 
    this.findInfractionByMemberId();
    this.findMemberPatchByMemberId();
    this.findTravelsByMemberId();    
  }

  /**
   * Retorna a URL da imagem de perfil
   */
  getProfileImageUrl(): string {
    // Se há preview, mostra o preview
    if (this.imagePreview) {
      return this.imagePreview;
    }    
    // Se há imagePath no member, usa o service para montar a URL
    if (this.member.imagePath && this.member.imagePath !== '') {
      return this.memberService.getImageUrl(this.member.imagePath);
    }    
    // Caso contrário, mostra a imagem padrão
    return this.defaultProfileImage;  // ← 'assets/img/noProfile.png'
  }
  onImageError(event: any): void {
    console.warn('Erro ao carregar imagem, usando imagem padrão');
    event.target.src = this.defaultProfileImage;
  }
  /**
   * Abre o seletor de arquivos quando clica na foto
   */
  alterarImagem(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Processa o arquivo selecionado
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    if (!file) {
      return;
    }

    // Validação de tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.toastr.error('Apenas imagens são permitidas (JPG, PNG, GIF, WEBP)!', 'Tipo inválido');
      this.resetFileInput();
      return;
    }

    // Validação de tamanho (máximo 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      this.toastr.error('A imagem deve ter no máximo 5MB!', 'Arquivo muito grande');
      this.resetFileInput();
      return;
    }

    // Armazena o arquivo selecionado
    this.selectedFile = file;

    // Cria preview da imagem
    this.createImagePreview(file);
  }

  /**
   * Cria preview da imagem antes de salvar
   */
  private createImagePreview(file: File): void {
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
      
      this.toastr.info('Imagem carregada! Clique em "Salvar Perfil" para confirmar.', 'Preview');
    };

    reader.onerror = () => {
      this.toastr.error('Erro ao ler o arquivo!', 'Erro');
      this.resetFileInput();
    };

    reader.readAsDataURL(file);
  }

  /**
   * Reseta o input de arquivo
   */
  private resetFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.selectedFile = null;
    this.imagePreview = null;
  }

  /**
   * Salva a foto de perfil no backend
   * TODO: Implementar quando o backend estiver pronto
   */
  salvarFotoPerfil(): void {
    if (!this.selectedFile) {
      this.toastr.warning('Nenhuma imagem selecionada!', 'Atenção');
      return;
    }
  
    // Mostra loading
    this.toastr.info('Enviando foto...', 'Aguarde');
  
    this.memberService.uploadProfileImage(this.member.id, this.selectedFile)
      .subscribe(
        (response) => {
          this.toastr.success('Foto atualizada com sucesso!', 'Sucesso');
          
          // Atualiza o caminho da imagem
          this.member.imagePath = response.imagePath;
          
          // Limpa preview e arquivo
          this.selectedFile = null;
          this.imagePreview = null;
          this.resetFileInput();
        },
        (error) => {
          console.error('Erro completo:', error);
          const errorMsg = error.error?.error || 'Erro ao salvar foto!';
          this.toastr.error(errorMsg, 'Erro');
        }
      );
  }

  /**
   * Cancela a seleção de imagem e restaura a original
   */
  cancelarFoto(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    this.resetFileInput();
    
    this.toastr.info('Alteração cancelada!', 'Cancelado');
  }

  /**
   * Verifica se há uma foto selecionada mas não salva
   */
  hasUnsavedPhoto(): boolean {
    return this.selectedFile !== null;
  }

  // ========================================
  // MÉTODOS EXISTENTES
  // ========================================

  findAllBloodType(){
    this.bloodTypeService.findAll().subscribe(resposta =>{
      this.bloodTypeList = resposta;
    })
  }

  findbyId(): void{
    this.memberService.findById(this.member.id).subscribe(resposta =>{      
      this.member = resposta;       
      
      var [dia, mes, ano] = this.member.birthDate.split('/');
      this.birthDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 
      this.bloodTypeMatSelected.setValue(this.member.bloodType.id);

      this.selectAddress(
        this.member.address.id,
        this.member.address.logradouro + " - " + this.member.address.number, 
        this.member.address.city.name + " - " + this.member.address.city.uf.acronym,
        this.member.address.postCode
      );
      
      this.selectHeadQuarter(
        this.member.headQuarter.id, 
        this.member.headQuarter.description,
        this.member.headQuarter.address.city.name
      );

      [dia, mes, ano] = this.member.admissionDate.split('/');
      this.admissionDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia)); 

      if(this.member.shutdowDate != null){
        [dia, mes, ano] = this.member.shutdowDate.split('/');
        this.shutdowDateStart = new Date(Number(ano), Number(mes) - 1, Number(dia));                
      }
      
      // Reseta preview se houver
      this.selectedFile = null;
      this.imagePreview = null;
      this.resetFileInput();
    })
  }

  togglePersonal(opened: boolean) {
    this.panelPersonalOpen = opened;
  }

  selectAddress(id: any, logradouroNumber : string, cityUf: string, postcode: string): void{   
    this.member.address.id = id;
    this.addressLogradouro.setValue(logradouroNumber);
    this.cityName.setValue(cityUf);
    this.addressPostCode.setValue(postcode);
  }
  
  toggleAddress(opened: boolean) {
    this.panelAdressOpen = opened;    
  }

  selectHeadQuarter(id: any, description: string, city: string): void{   
    this.member.headQuarter.id = id;
    this.headQuarterDescription.setValue(description);    
    this.headQuarterCity.setValue(city);   
  }
  
  toggleHeadQuarter(opened: boolean) {
    this.panelHeadQuarterOpen = opened;
  }

  findInfractionByMemberId(){
    if(this.member.id != null){
      this.infractionService.findByMemberId(this.member.id).subscribe(resposta =>{
        this.ELEMENT_DATA_INFRACTION = resposta.sort((a, b) => 
          new Date(b.infractionDate).getTime() - new Date(a.infractionDate).getTime()
        );
        this.dataSourceInfraction = new MatTableDataSource<Infraction>(resposta);
        this.dataSourceInfraction.paginator = this.paginatorTravel;
      });
    }
  }
  
  toggleInfraction(opened: boolean) {
    this.panelInfractionOpen = opened;    
  }
  visualizarAdvertencia(infraction: Infraction): void {
    this.selectedInfraction = infraction;
    this.showInfractionModal = true;   
  }
  fecharModal(): void {
    this.showInfractionModal = false;
    this.selectedInfraction = null;
  }

  /**
   * Retorna a cor do tipo de advertência
   */
  getInfractionColor(): string {
    if (!this.selectedInfraction) return '#6b7280';
    
    const type = this.selectedInfraction.infractionType;
    return this.infractionTypes[type]?.color || '#6b7280';
  }

  /**
   * Retorna o ícone do tipo de advertência
   */
  getInfractionIcon(): string {
    if (!this.selectedInfraction) return 'info';
    
    const type = this.selectedInfraction.infractionType;
    return this.infractionTypes[type]?.icon || 'info';
  }
  /**
 * Retorna a classe CSS do tipo de advertência
 */
getInfractionClass(): string {
  if (!this.selectedInfraction) return '';
  
  const type = this.selectedInfraction.infractionType;
  const classMap = {
    'Escrita': 'badge-escrita',
    'Suspensão': 'badge-suspensao',
    'Verbal': 'badge-verbal',
    'Desligamento': 'badge-desligamento',
    'Rebaixamento': 'badge-rebaixamento',
    'Expulsão': 'badge-expulsao'
  };
  
  return classMap[type] || '';
}

  findMemberPatchByMemberId(){
    if(this.member.id != null){
      this.memberPatchService.findByMemberId(this.member.id).subscribe(resposta =>{
        this.ELEMENT_DATA_MEMBERPATCH = resposta.sort((a, b) => 
          new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime()
        );
        this.dataSourceMemberPatch = new MatTableDataSource<MemberPatch>(resposta);
        this.dataSourceMemberPatch.paginator = this.paginatorMemberPatch;
      });
    }
  }
  
  toggleMemberPatch(opened: boolean) {
    this.panelMemberPatchOpen = opened;    
  }
  visualizarGraduacao(memberPatch: MemberPatch): void {
    this.selectedMemberPatch = memberPatch;
    this.showMemberPatchModal = true;   
  }
  /**
 * Fecha o modal de graduação
 */
  fecharModalGraduacao(): void {
    this.showMemberPatchModal = false;
    this.selectedMemberPatch = null;
  }

  findTravelsByMemberId(){
    if(this.travelStartDateForm.value != null && this.travelEndDateForm.value != null && this.member.id != null){
      this.travelControlservice.findByMemberIdAndPeriod(
        this.member.id, 
        this.travelStartDateForm.value.toLocaleDateString('fr-CA'),
        this.travelEndDateForm.value.toLocaleDateString('fr-CA')
      ).subscribe(resposta =>{
        this.ELEMENT_DATA_TRAVELCONTROL = resposta.sort((a, b) => 
          new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime()
        );
        this.dataSourceTravel = new MatTableDataSource<TravelControl>(resposta);
        this.dataSourceTravel.paginator = this.paginatorTravel;
      });
    }
  }
  
  toggleTravels(opened: boolean) {
    this.panelTravelsOpen = opened;    
  }

  /**
   * Abre o modal de visualização da viagem
   */
  visualizarViagem(travel: TravelControl): void {
    this.selectedTravel = travel;
    this.showTravelModal = true;
  }

  /**
   * Fecha o modal de viagem
   */
  fecharModalViagem(): void {
    this.showTravelModal = false;
    this.selectedTravel = null;
  }

  /**
   * Verifica se é KM cheio
   */
  isFullKm(): boolean {
    if (!this.selectedTravel) return false;  
    return this.selectedTravel.kmControl === 'KMCHEIO';
  }

  /**
   * Calcula o KM computado (cheio ou meio)
   */
  getComputedKm(): number {
    if (!this.selectedTravel || !this.selectedTravel.km) return 0;
    
    const totalKm = Number(this.selectedTravel.km);
    
    if (this.isFullKm()) {
      return totalKm; // 100% do KM (KMCHEIO)
    } else {
      return totalKm / 2; // 50% do KM (MEIOKM)
    }
  }
    toggleAccess(opened: boolean) {
      this.panelAccessOpen = opened;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceTravel.filter = filterValue.trim().toLowerCase();
    }

    validaCamposPassword(): boolean {
      // Verifica se todos os campos estão preenchidos
      if (!this.senhaAtual || !this.novaSenha || !this.confirmaSenha) {
        return false;
      }
    
      // Verifica se a nova senha tem no mínimo 6 caracteres
      if (this.novaSenha.length < 6) {
        return false;
      }
    
      // Verifica se as senhas conferem
      if (this.novaSenha !== this.confirmaSenha) {
        return false;
      }
    
      return true;
    }    
    
 /**
 * Atualiza a senha do usuário
 */
  updatePassword(): void {
    // Validação 1: Verificar se os campos estão preenchidos
    if (!this.validaCamposPassword()) {
      this.toastr.error('Preencha todos os campos corretamente!', 'Erro');
      return;
    }

    // Validação 2: Verificar se as senhas novas conferem
    if (this.novaSenha !== this.confirmaSenha) {
      this.toastr.error('As senhas não conferem!', 'Erro');
      this.confirmaSenhaControl.setErrors({ 'mustMatch': true });
      return;
    }

    // Validação 3: Verificar se a nova senha é diferente da atual
    if (this.novaSenha === this.senhaAtual) {
      this.toastr.warning('A nova senha deve ser diferente da senha atual!', 'Atenção');
      return;
    }

    // Confirmação do usuário
    if (!confirm('Tem certeza que deseja alterar sua senha?')) {
      return;
    }

    // Mostra loading
    this.toastr.info('Atualizando senha...', 'Aguarde');

    // Chama o service (BACKEND vai validar a senha atual)
    this.memberService.updatePassword(this.member.id, this.senhaAtual, this.novaSenha)
      .subscribe(
        (response) => {
          this.toastr.success('Senha atualizada com sucesso!', 'Sucesso');
          
          // Limpa os campos
          this.limparCamposSenha();
          
          // Opcional: Fazer logout para forçar novo login
          // this.authService.logout();
          // this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao atualizar senha:', error);
          
          if (error.status === 401 || error.status === 400) {
            // Backend retornou erro de senha incorreta
            this.toastr.error('Senha atual incorreta!', 'Erro');
            this.senhaAtualControl.setErrors({ 'incorrect': true });
          } else {
            const errorMsg = error.error?.error || 'Erro ao atualizar senha!';
            this.toastr.error(errorMsg, 'Erro');
          }
        }
      );
  }
    /**
     * Limpa os campos de senha
     */
    limparCamposSenha(): void {
      this.senhaAtual = '';
      this.novaSenha = '';
      this.confirmaSenha = '';
      
      this.senhaAtualControl.reset();
      this.novaSenhaControl.reset();
      this.confirmaSenhaControl.reset();
    }
    
    /**
     * Retorna a força da senha
     */
    getPasswordStrength(): string {
      if (!this.novaSenha) return '';
    
      const senha = this.novaSenha;
      let strength = 0;
    
      // Critérios
      if (senha.length >= 6) strength++;
      if (senha.length >= 10) strength++;
      if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) strength++; // Maiúsculas e minúsculas
      if (/\d/.test(senha)) strength++; // Números
      if (/[^a-zA-Z0-9]/.test(senha)) strength++; // Caracteres especiais
    
      if (strength <= 2) return 'weak';
      if (strength <= 4) return 'medium';
      return 'strong';
    }
    
    /**
     * Retorna o texto da força da senha
     */
    getPasswordStrengthText(): string {
      const strength = this.getPasswordStrength();
      
      switch (strength) {
        case 'weak': return 'Senha Fraca';
        case 'medium': return 'Senha Média';
        case 'strong': return 'Senha Forte';
        default: return '';
      }
    }
}