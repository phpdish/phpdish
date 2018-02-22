<?php declare(strict_types = 1);

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180222111032 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE notifications ADD payment_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE notifications ADD CONSTRAINT FK_6000B0D34C3A3BB FOREIGN KEY (payment_id) REFERENCES payments (id)');
        $this->addSql('CREATE INDEX IDX_6000B0D34C3A3BB ON notifications (payment_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE notifications DROP FOREIGN KEY FK_6000B0D34C3A3BB');
        $this->addSql('DROP INDEX IDX_6000B0D34C3A3BB ON notifications');
        $this->addSql('ALTER TABLE notifications DROP payment_id');
    }
}
