import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credentials = {
    email: '',
    password: ''
  }

  // Form controls with validators
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  // UI state
  hidePassword: boolean = true;
  isLoading: boolean = false;
  rememberMe: boolean = false;

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if user credentials are saved (remember me functionality)
    this.loadSavedCredentials();
  }

  /**
   * Perform login authentication
   */
  logar(): void {
    if (!this.validaCampos()) {
      this.toast.warning('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;

    this.service.authenticate(this.creds).subscribe({
      next: (response) => {
        this.service.successfulLogin(response);
        
        // Save credentials if remember me is checked
        if (this.rememberMe) {
          this.saveCredentials();
        } else {
          this.clearSavedCredentials();
        }

        this.toast.success('Login realizado com sucesso!', 'Bem-vindo!');
        this.router.navigate(['home']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao logar:', err);
        
        // Better error handling based on status code
        if (err.status === 401) {
          this.toast.error('Usuário e/ou senha inválidos!', 'Erro de Autenticação');
        } else if (err.status === 0) {
          this.toast.error('Não foi possível conectar ao servidor. Verifique sua conexão.', 'Erro de Conexão');
        } else {
          this.toast.error('Ocorreu um erro ao fazer login. Tente novamente.', 'Erro');
        }
        
        this.isLoading = false;
      },
    });
  }

  /**
   * Validate form fields
   */
  validaCampos(): boolean {
    return this.email.valid && this.password.valid;
  }

  /**
   * Handle forgot password action
   */
  forgotPassword(): void {
    this.toast.info('Funcionalidade de recuperação de senha em desenvolvimento.', 'Em breve!');
    // TODO: Implement forgot password functionality
    // this.router.navigate(['forgot-password']);
  }

  /**
   * Handle register action
   */
  register(): void {
    this.toast.info('Funcionalidade de cadastro em desenvolvimento.', 'Em breve!');
    // TODO: Implement registration functionality
    // this.router.navigate(['register']);
  }

  /**
   * Save credentials to localStorage (remember me)
   */
  private saveCredentials(): void {
    try {
      localStorage.setItem('savedEmail', this.creds.email);
      localStorage.setItem('rememberMe', 'true');
    } catch (error) {
      console.error('Erro ao salvar credenciais:', error);
    }
  }

  /**
   * Load saved credentials from localStorage
   */
  private loadSavedCredentials(): void {
    try {
      const savedEmail = localStorage.getItem('savedEmail');
      const rememberMe = localStorage.getItem('rememberMe');

      if (rememberMe === 'true' && savedEmail) {
        this.creds.email = savedEmail;
        this.email.setValue(savedEmail);
        this.rememberMe = true;
      }
    } catch (error) {
      console.error('Erro ao carregar credenciais salvas:', error);
    }
  }

  /**
   * Clear saved credentials from localStorage
   */
  private clearSavedCredentials(): void {
    try {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('rememberMe');
    } catch (error) {
      console.error('Erro ao limpar credenciais salvas:', error);
    }
  }
}
